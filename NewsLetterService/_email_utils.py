import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

# Configurações do servidor SMTP
SMTP_SERVER = 'smtp.gmail.com'
SMTP_PORT = 587
SMTP_USERNAME = 'matheus.nantes246@gmail.com'
SMTP_PASSWORD = 'ozsf vqda kkkn crug' 

def enviar_email(destinatario, assunto, corpo):
    try:
        # Cria uma mensagem multipart (texto + HTML)
        msg = MIMEMultipart()
        msg['From'] = SMTP_USERNAME
        msg['To'] = destinatario
        msg['Subject'] = assunto

        # Corpo da mensagem
        mensagem = corpo
        msg.attach(MIMEText(mensagem, 'html'))  # HTML

        # Configuração da conexão SMTP
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(SMTP_USERNAME, SMTP_PASSWORD)

        # Envio do email
        server.sendmail(SMTP_USERNAME, destinatario, msg.as_string())

        # Finaliza a conexão SMTP
        server.quit()

        print(f"Email enviado para {destinatario}")
        return True
    except Exception as e:
        print(f"Falha ao enviar email para {destinatario}: {e}")
        return False
