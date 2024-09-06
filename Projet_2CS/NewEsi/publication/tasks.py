from celery import shared_task
from django.utils import timezone
from datetime import timedelta
from django.core.mail import send_mail
from django.conf import settings
from .models import Publication, Utilisateur



@shared_task
def remind_admins_to_validate_publications():
    print("This task runs every day.")
    now = timezone.now()
    reminder_threshold = now + timedelta(days=1)

    pending_publications = Publication.objects.filter(
        etat='en attente',
        date_publication__lte=reminder_threshold
    )

    for publication in pending_publications:
        category = publication.publisher.Categorie
        admins = Utilisateur.objects.filter(is_adminstrateur=True, Categorie=category)

        for admin in admins:
            subject = "Rappel : Valider la publication avant la date limite"
            message = (
                f"Bonjour {admin.first_name} {admin.family_name},\n\n"
                f"La publication intitulée '{publication.titre}' est toujours en attente et "
                f"doit être validée avant sa date de publication prévue : "
                f"{publication.date_publication.strftime('%Y-%m-%d %H:%M:%S')}.\n\n"
                "Merci de bien vouloir examiner et valider la publication pour garantir sa publication à temps.\n\n"
                "Merci !"
            )

            send_mail(
                subject=subject,
                message=message,
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[admin.email],
                fail_silently=True,
            )
