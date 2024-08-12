from django.test import TestCase
import requests

class PublicationAPITest(TestCase):
    def test_add_publications(self):
        url = 'http://127.0.0.1:8000/publication/add/'
        headers = {'Content-Type': 'application/json'}
        data = [
            {"titre": "Publication 1", "description": "Description for Publication 1", "etat": "valide", "type_publication": "event", "date_debut": "2024-04-01T09:00:00Z", "date_fin": "2024-04-01T17:00:00Z", "date_publication": "2024-03-25T08:00:00Z", "category": "Category A"},
            {"titre": "Publication 2", "description": "Description for Publication 2", "etat": "en attente", "type_publication": "actualité", "date_debut": "2024-04-10T00:00:00Z", "date_fin": None, "date_publication": "2024-03-30T12:00:00Z", "category": "Category B"}
        ]

        response = requests.post(url, json=data, headers=headers)
        
        # Assert the status code
        self.assertEqual(response.status_code, 201)  # Assuming 201 is the expected status code for successful creation
        
        # Optionally, assert the content of the response
        response_data = response.json()
        
        # Remove 'id' field from response data
        for item in response_data:
            item.pop('id_publication', None)
            item.pop('image', None)  # Remove the 'image' key
        
        # Assert each dictionary in response_data with the corresponding dictionary in data
        for expected, actual in zip(data, response_data):
            self.assertDictEqual(expected, actual)
