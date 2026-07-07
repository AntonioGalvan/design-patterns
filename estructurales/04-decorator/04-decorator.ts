namespace decoratorPattern {
    //Component (Define el contrato que todos deben cumplir, tanto el componente concreto como los decoradores)
    interface Notification {
        send(message: string): void;
    }

    //Concrete Component (implementa la funcionalidad básica)
    class BasicNotification implements Notification {
        send(message: string): void {
            console.log("Enviando notificación básica: " + message);
        }
    }

    //Base Decorator (define la interfaz que deben seguir los decoradores) 
    //Guarda una referencia al objeto envuelto que está decorando y delega la llamada al método send().
    abstract class NotificationDecorator implements Notification {
        protected notification: Notification;

        constructor(notification: Notification) {
            this.notification = notification;
        }

        send(message: string): void {
            this.notification.send(message);
        }
    }

    //Concrete Decorators (agregan funcionalidades adicionales al objeto envuelto)
    class EmailDecorator extends NotificationDecorator {

        private sendEmail(message: string): void {
            console.log("Enviando correo electrónico: " + message);
        }

        override send(message: string): void {
            super.send(message);
            this.sendEmail(message);
        }
    }

    class SMSDecorator extends NotificationDecorator {
        
        private sendSMS(message: string): void {
            console.log("Enviando SMS: " + message);
        }   

        override send(message: string): void {
            super.send(message);
            this.sendSMS(message);
        }
    }
 
    function main() {
        let notification: Notification = new BasicNotification();

        notification = new EmailDecorator(notification);
        notification = new SMSDecorator(notification);

        notification.send("ALERTA: Noficación básica enviada.");
    }

    main();
}