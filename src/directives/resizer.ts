class Resizer {
    resizer;
    element?: HTMLElement;
    constructor(callback: ResizeObserverCallback) {
        this.resizer = new ResizeObserver(callback);
    }
    observe(el: HTMLElement) {
        this.element = el;
        this.resizer.observe(el);
    }
    disconnect() {
        this.element = undefined;
        this.resizer.disconnect();
    }
}

let resizers: Resizer[] = [];

// TODO: Разобраться с типами
export default {
    mounted(el: any, binding: any, vnode: any, prevVnode: any) {
        let resizer = new Resizer(binding.value);
        resizer.observe(el);
        resizers.push(resizer);
    },
    beforeUnmount(el: any, binding: any, vnode: any, prevVnode: any) {
        for (const resizer of resizers) {
            if (resizer.element === el) {
                resizer.disconnect();
                resizers = resizers.filter((item) => item !== resizer);
            }
        }
    },
};
