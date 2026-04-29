import json
import re
from typing import Any, Dict, Type
from pydantic import BaseModel, ValidationError


def _extract_json_fragment(raw_text: str) -> str:
    text = (raw_text or "").strip()

    code_block = re.search(r"```(?:json)?\s*(\{.*?\})\s*```", text, re.DOTALL)
    if code_block:
        return code_block.group(1)

    json_fragment = re.search(r"(\{.*\})", text, re.DOTALL)
    if json_fragment:
        return json_fragment.group(1)

    return text


def parse_llm_response(raw_text: str, model_cls: Type[BaseModel]) -> Dict[str, Any]:
    try:
        payload = json.loads(_extract_json_fragment(raw_text))
        return model_cls.model_validate(payload).model_dump()
    except (json.JSONDecodeError, ValidationError, TypeError):
        return model_cls().model_dump()
