from rest_framework.response import Response
from rest_framework import status
from functools import wraps
from .models import Utilisateur

def user_types_required(*user_types):
    """
    Decorator to check if the user has all specified user types.
    """
    def decorator(view_func):
        @wraps(view_func)
        def _wrapped_view(request, *args, **kwargs):
            user = request.user
            if user.is_authenticated:
                if any(getattr(user, f'is_{user_type}') for user_type in user_types):
                    return view_func(request, *args, **kwargs)
                else:
                    return Response(f"You must be {' and '.join(user_types)} to perform this action", status=status.HTTP_403_FORBIDDEN)
            else:
                return Response("Authentication required", status=status.HTTP_401_UNAUTHORIZED)
        return _wrapped_view
    return decorator



def user_permission_required(*user_permissions):
    """
    Decorator to check if the user has all specified user permissions.
    """
    def decorator(view_func):
        @wraps(view_func)
        def _wrapped_view(request, *args, **kwargs):
            user = request.user
            if user.is_authenticated:
                if all(user_permission in user.get_user_permissions() for user_permission in user_permissions):
                    return view_func(request, *args, **kwargs)
                else:
                    return Response(f"You must be {' and '.join(user_permissions)} to perform this action", status=status.HTTP_403_FORBIDDEN)
            else:
                return Response("Authentication required", status=status.HTTP_401_UNAUTHORIZED)
        return _wrapped_view
    return decorator

