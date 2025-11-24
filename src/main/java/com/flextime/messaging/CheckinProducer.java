package com.flextime.messaging;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class CheckinProducer {

    // Método chamado pelo serviço de check-in.
    // Agora ele só loga e não usa RabbitMQ.
    public void enviarMensagemCheckin(Long checkinId) {
        log.info("Check-in {} registrado (RabbitMQ desativado nesta implantação).", checkinId);
    }
}
