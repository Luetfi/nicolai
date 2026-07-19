#!/usr/bin/env python3
"""Converts an HTML proposal file to PDF using Playwright."""

import sys
from pathlib import Path
from playwright.sync_api import sync_playwright


def html_to_pdf(html_path: str) -> str:
    html_file = Path(html_path).resolve()
    if not html_file.exists():
        print(f"Error: {html_file} not found")
        sys.exit(1)

    pdf_file = html_file.with_suffix(".pdf")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto(f"file://{html_file}", wait_until="domcontentloaded", timeout=15000)
        page.pdf(
            path=str(pdf_file),
            format="A4",
            margin={"top": "0mm", "right": "0mm", "bottom": "0mm", "left": "0mm"},
            print_background=True,
        )
        browser.close()

    print(f"PDF created: {pdf_file}")
    return str(pdf_file)


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python html-to-pdf.py <path-to-html>")
        sys.exit(1)
    html_to_pdf(sys.argv[1])
