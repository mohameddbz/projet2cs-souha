set -o errexit
REQUIREMENTS_FILE="./env/requirements.txt"

# Install dependencies from requirements.txt
pip install -r "$REQUIREMENTS_FILE"

# Navigate to the directory containing manage.py
cd Projet_2CS/NewEsi/


# Collect static files
python manage.py collectstatic --no-input

# Apply database migrations
# python manage.py makemigrations
# python manage.py migrate





