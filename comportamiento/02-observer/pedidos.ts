namespace ObserverPedidosPattern {
    type OrderStatus = "pendiente" | "pagado" | "enviado" | "entregado" | "cancelado";

    interface OrderObserver {
        update(order: Order): void;
    }

    class Order {
        public readonly id: string;
        public readonly customer: string;

        private observers: OrderObserver[] = [];
        private status: OrderStatus = "pendiente";

        constructor(id: string, customer: string) {
            this.id = id;
            this.customer = customer;
        }

        subscribe(observer: OrderObserver): void {
            this.observers.push(observer);
        }

        unsubscribe(observer: OrderObserver): void {
            this.observers = this.observers.filter((o) => o !== observer);
        }

        changeStatus(newStatus: OrderStatus): void {
            this.status = newStatus;

            this.observers.forEach((observer) => observer.update(this));
        }

        get Status(): OrderStatus {
            return this.status;
        }
    }

    class EmailService implements OrderObserver {
        update(order: Order): void {
            console.log(`Correo a ${order.customer}: tu pedido esta "${order.Status}"`);
        }
    }

    class InventoryService implements OrderObserver {
        update(order: Order): void {
            console.log(`Inventario: pedido ${order.id} paso a "${order.Status}"`);
        }
    }

    const order = new Order("ORD-1024", "ana@correo.com");
    const email = new EmailService();
    const inventory = new InventoryService();

    order.subscribe(email);
    order.subscribe(inventory);

    order.changeStatus("pagado");
    order.changeStatus("enviado");

    order.unsubscribe(email);
    order.changeStatus("entregado");
}