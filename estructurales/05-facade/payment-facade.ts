namespace FacadePayment {
    class InventoryService {
        checkStock(product: string, quantity: number): boolean {
            console.log(`[Inventario] Verificando stock de "${product}" (x${quantity})...`);

            // Simulamos que siempre hay stock disponible
            return true;
        }

        reserveStock(product: string, quantity: number): void {
            console.log(`[Inventario] Reservando ${quantity} unidad(es) de "${product}".`);
        }
    }

    class PaymentService {
        charge(customer: string, amount: number): boolean {
            console.log(`[Pago] Cobrando $${amount} a ${customer}...`);

            // Simulamos que el pago siempre es exitoso
            console.log(`[Pago] Pago aprobado.`);
            return true;
        }
    }

    class ShippingService {
        createShipment(customer: string, product: string): string {
            const trackingId = `TRK-${Math.floor(Math.random() * 100000)}`;

            console.log(`[Envío] Generando guía de envío para ${customer} (${product}). ID: ${trackingId}`);
            return trackingId;
        }
    }

    class NotificationService {
        sendConfirmation(customer: string, trackingId: string): void {
            console.log(`[Notificación] Enviando email a ${customer}: "Tu pedido fue confirmado. Clave de rastreo: ${trackingId}"`);
        }
    }


    class OrderFacade {
        private inventory: InventoryService;
        private payment: PaymentService;
        private shipping: ShippingService;
        private notification: NotificationService;

        constructor() {
            this.inventory = new InventoryService();
            this.payment = new PaymentService();
            this.shipping = new ShippingService();
            this.notification = new NotificationService();
        }

        placeOrder(customer: string, product: string, quantity: number, amount: number): void {
            console.log(`=== Iniciando compra de "${product}" para ${customer} ===`);

            const hasStock = this.inventory.checkStock(product, quantity);

            if (!hasStock) {
                console.log("No hay stock disponible. Compra cancelada.");
                return;
            }

            this.inventory.reserveStock(product, quantity);

            const paymentSuccessful = this.payment.charge(customer, amount);

            if (!paymentSuccessful) {
                console.log("El pago fue rechazado. Compra cancelada.");
                return;
            }

            const trackingId = this.shipping.createShipment(customer, product);
            this.notification.sendConfirmation(customer, trackingId);

            console.log('=== Compra completada con éxito ===');
        }
    }

    function main() {
        const tienda = new OrderFacade();

        tienda.placeOrder("Antonio", "Teclado mecánico", 1, 899);
        tienda.placeOrder("María", "Monitor 27''", 2, 3200);
    }

    main();

}
