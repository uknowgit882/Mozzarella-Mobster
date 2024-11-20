class TitleScreen {
    constructor({ progress }) {
        this.progress = progress;
    }

    getOptions(resolve) {
        const safeFile = this.progress.getSaveFile();
        return [
            {
                label: "New Game",
                description: "Start a new adventure!",
                handler: () => {
                    this.close();
                    resolve();
                }
            },
            safeFile ? {
                label: "Continue",
                description: "Resume your previous adventure.",
                handler: () => {
                    this.close();
                    resolve(safeFile);
                }
            } : null
        ].filter(v => v);
    }

    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("TitleScreen");
        this.element.innerHTML = (`
        <img class="TitleScreen_logo" src="/images/logo2.png" alt="Mozzarella Mobster" />
        `);
    }

    close() {
        this.keyboardMenu.end();
        this.element.remove();
    }

    init(container) {
        return new Promise(resolve => {
            this.createElement();
            container.appendChild(this.element);
            this.keyboardMenu = new KeyboardMenu();
            this.keyboardMenu.init(this.element);
            this.keyboardMenu.setOptions(this.getOptions(resolve))
        })
    }
}