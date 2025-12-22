package com.example.demo.service;

import com.example.demo.model.ContactMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service
public class ContactService {

    private final WebClient webClient;
    private final String toEmail;
    private final String fromEmail;

    public ContactService(
            @Value("${resend.api-key}") String apiKey,
            @Value("${contact.email}") String toEmail,
            @Value("${resend.from}") String fromEmail
    ) {
        this.toEmail = toEmail;
        this.fromEmail = fromEmail;

        this.webClient = WebClient.builder()
                .baseUrl("https://api.resend.com")
                .defaultHeader("Authorization", "Bearer " + apiKey)
                .build();
    }

    @Async
    public void handle(ContactMessage message) {
        String html = """
        <!DOCTYPE html>
        <html>
          <body style="margin:0;padding:0;background-color:#f6f7f9;font-family:Arial,sans-serif;">
            <table width="100%%" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center" style="padding:24px;">
                  <table width="600" cellpadding="0" cellspacing="0"
                         style="background:#ffffff;border-radius:8px;padding:24px;">
                    <tr>
                      <td style="font-size:20px;font-weight:bold;color:#111;">
                        📬 New Portfolio Message
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-top:16px;font-size:14px;color:#333;">
                        <strong>Name:</strong> %s<br/>
                        <strong>Email:</strong> %s
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-top:16px;font-size:14px;color:#333;line-height:1.5;">
                        %s
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-top:24px;font-size:12px;color:#888;">
                        Sent from your portfolio contact form
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
        """.formatted(
                message.getName(),
                message.getEmail(),
                message.getMessage().replace("\n", "<br/>")
        );

        webClient.post()
                .uri("/emails")
                .bodyValue(Map.of(
                        "from", fromEmail,
                        "to", toEmail,
                        "subject", "New message from Portfolio!",
                        "html", html,
                        "text", """
                                Name: %s
                                Email: %s
                                
                                %s
                                """.formatted(
                                message.getName(),
                                message.getEmail(),
                                message.getMessage()
                        )
                ))
                .retrieve()
                .bodyToMono(Void.class)
                .block();
    }
}
