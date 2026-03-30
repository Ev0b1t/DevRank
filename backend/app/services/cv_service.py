import io
import PyPDF2
from typing import Optional

class CVService:
    @staticmethod
    def extract_text_from_pdf(pdf_content: bytes) -> str:
        pdf_reader = PyPDF2.PdfReader(io.BytesIO(pdf_content))
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text() + "\n"
        return text

    @staticmethod
    def clean_text(text: str) -> str:
        # Basic cleaning: remove extra whitespace
        return " ".join(text.split())

    async def get_cv_text(self, file_content: Optional[bytes] = None, raw_text: Optional[str] = None) -> str:
        if raw_text:
            return self.clean_text(raw_text)
        elif file_content:
            extracted = self.extract_text_from_pdf(file_content)
            return self.clean_text(extracted)
        return ""
