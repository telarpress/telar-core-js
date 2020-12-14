export class EventBus {
    subscriptions: Record<string, any> = {};

    subscribe = (eventType: string, callback: (...args: any[]) => any) => {
        const id = Symbol('id');
        if (!this.subscriptions[eventType]) this.subscriptions[eventType] = {};
        this.subscriptions[eventType][id] = callback;
        return {
            unsubscribe: () => {
                delete this.subscriptions[eventType][id];
                if (Object.getOwnPropertySymbols(this.subscriptions[eventType]).length === 0) {
                    delete this.subscriptions[eventType];
                }
            },
        };
    };

    publish = (eventType: string, arg: any) => {
        if (!this.subscriptions[eventType]) return;

        Object.getOwnPropertySymbols(this.subscriptions[eventType]).forEach((key) =>
            this.subscriptions[eventType][key](arg),
        );
    };
}

export default EventBus;
