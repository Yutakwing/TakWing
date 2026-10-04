import json,html
from reportlab.platypus import SimpleDocTemplate,Paragraph,Spacer,KeepTogether
from reportlab.lib.styles import getSampleStyleSheet,ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from pathlib import Path
root=Path(__file__).resolve().parent.parent
styles=getSampleStyleSheet();styles.add(ParagraphStyle(name='CVTitle',fontName='Helvetica-Bold',fontSize=22,leading=26,textColor=HexColor('#205d58'),spaceAfter=10))
styles.add(ParagraphStyle(name='CVBody',fontName='Helvetica',fontSize=9.5,leading=12.5,spaceAfter=4))
styles.add(ParagraphStyle(name='CVSection',fontName='Helvetica-Bold',fontSize=11,leading=15,spaceBefore=13,spaceAfter=5,textColor=HexColor('#205d58'),keepWithNext=True))
esc=lambda t:html.escape(t.replace('–','-').replace('—','-').replace('’',"'").replace('“','"').replace('”','"').replace('•',';'))
story=[Paragraph('TAK WING YU',styles['CVTitle']),Paragraph('PhD, MSc, BSc (Hons) Physiotherapy<br/>Senior Lecturer in Physiotherapy | Saint Francis University, Hong Kong<br/>Educational development, assessment, AI, VR and simulation',styles['CVBody']),Paragraph('Public academic CV | Updated 4 October 2026<br/><link href="https://yutakwing.github.io/TakWing/">yutakwing.github.io/TakWing/</link> | yutakwing001@gmail.com',styles['CVBody'])]
for section in json.loads((root/'data/public-cv.json').read_text()):
 story.append(Paragraph(esc(section['heading']),styles['CVSection']))
 for item in section['items']:story.append(Paragraph(esc(item),styles['CVBody']))
story += [Paragraph('SCHOLARSHIP',styles['CVSection']),Paragraph('Selected publications and project records: <link href="https://yutakwing.github.io/TakWing/research.html#publications">Research and publications</link>.<br/>ORCID: <link href="https://orcid.org/0000-0002-9650-0370">0000-0002-9650-0370</link>. References available on request.',styles['CVBody'])]
def footer(canvas,doc):
 canvas.saveState();canvas.setFont('Helvetica',8);canvas.setFillColor(HexColor('#526360'));canvas.drawString(42,27,'Tak Wing Yu | Public academic CV | 4 October 2026');canvas.drawRightString(A4[0]-42,27,str(doc.page));canvas.restoreState()
SimpleDocTemplate(str(root/'assets/tak-wing-yu-public-cv.pdf'),pagesize=A4,rightMargin=42,leftMargin=42,topMargin=40,bottomMargin=45,title='Tak Wing Yu - Public Academic CV',author='Tak Wing Yu').build(story,onFirstPage=footer,onLaterPages=footer)
