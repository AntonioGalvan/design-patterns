namespace BridgeNotifications {
    interface NotificationChannel {
        send(message: string): void;
    }

    class EmailChannel implements NotificationChannel {
        send(message: string): void {
            console.log(`Enviando notificación por correo electrónico: ${message}`);
        }
    }

    class SMSChannel implements NotificationChannel {
        send(message: string): void {
            console.log(`Enviando notificación por SMS: ${message}`);
        }
    }

    class PushNotificationChannel implements NotificationChannel {
        send(message: string): void {
            console.log(`Enviando notificación push: ${message}`);
        }
    }

    abstract class Notification {
        protected channel: NotificationChannel;

        constructor(channel: NotificationChannel) {
            this.channel = channel;
        }

        setChannel(channel: NotificationChannel): void {
            this.channel = channel;
        }

        abstract notify(message: string): void;
    }

    class AlertNotification extends Notification {
        override notify(message: string): void {
            console.log("Notificación - Alerta:");
            this.channel.send(message);
        }
    }

    class ReminderNotification extends Notification {
        override notify(message: string): void {
            console.log("Notificación - Recordatorio:");
            this.channel.send(message);
        }
    }

    function main() {
        const alert = new AlertNotification(new EmailChannel());

        alert.notify("¡Alerta! Se ha detectado un acceso no autorizado.");

        alert.setChannel(new SMSChannel());
        alert.notify("¡Alerta! Se ha detectado un acceso no autorizado.");

        const reminder = new ReminderNotification(new SMSChannel());

        reminder.notify("Recordatorio: Tienes una reunión programada a las 3 PM.");

        reminder.setChannel(new PushNotificationChannel());
        reminder.notify("Recordatorio: Tienes una reunión programada a las 3 PM.");
    }

    main();
}

