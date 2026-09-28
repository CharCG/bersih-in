import streamlit as st
import requests
from io import BytesIO
from PIL import Image

file = None
input_type = st.sidebar.radio('Choose the Input Type!', ['Upload', 'Camera', 'Link'])

if input_type == 'Upload':
    file = st.file_uploader('📤', type=['jpg', 'jpeg', 'png'])
elif input_type == 'Camera':
    file = st.camera_input('📷')
elif input_type == 'Link':
    image_url = st.text_input('🔗')
    image_button = st.button("Classify")
    if image_button:
        try:
            image_bytes = requests.get(image_url)
            image = Image.open(BytesIO(image_bytes.content))
            file = BytesIO()
            image.save(file, format='PNG')
            file.seek(0)
        except Exception as e:
            st.write(str(e))

if file is not None:
    st.image(file, caption='Uploaded Image', use_container_width=True)

    try:
        response = requests.post(
            'http://127.0.0.1:8000/api/classify',
            files={'file': file}
        )

        if response.status_code == 200:
            st.write(response.json())
        else:
            st.write(response.status_code, response.text)
    except Exception as e:
        st.write(str(e))
