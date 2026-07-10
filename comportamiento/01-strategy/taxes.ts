namespace TaxStrategyPattern {
    interface TaxStrategy {
        calculateTax(amount: number): number;
    }

    class USATaxStrategy implements TaxStrategy {
        calculateTax(amount: number): number {
            return amount * 0.07;
        }
    }

    class CanadaTaxStrategy implements TaxStrategy {
        calculateTax(amount: number): number {
            return amount * 0.05;
        }
    }

    class MexicoTaxStrategy implements TaxStrategy {
        calculateTax(amount: number): number {
            return amount * 0.16;
        }
    }

    class TaxCalculator {
        private taxStrategy: TaxStrategy;

        constructor(taxStrategy: TaxStrategy) {
            this.taxStrategy = taxStrategy;
        }

        setTaxStrategy(taxStrategy: TaxStrategy): void {
            this.taxStrategy = taxStrategy;
        }

        calculate(amount: number): number {
            return this.taxStrategy.calculateTax(amount);
        }
    }

    function main() {
        const amount = 100;

        const taxCalculator = new TaxCalculator(new USATaxStrategy());
        console.log(`USA Tax on $${amount}: $${taxCalculator.calculate(amount)}`);

        taxCalculator.setTaxStrategy(new CanadaTaxStrategy());
        console.log(`Canada Tax on $${amount}: $${taxCalculator.calculate(amount)}`);

        taxCalculator.setTaxStrategy(new MexicoTaxStrategy());
        console.log(`Mexico Tax on $${amount}: $${taxCalculator.calculate(amount)}`);
    }

    main();
}