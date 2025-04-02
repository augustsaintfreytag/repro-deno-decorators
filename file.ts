export function InstanceProperty() {
	return function (_value: unknown, context: ClassFieldDecoratorContext) {
		const { name } = context
		const dataPropertyName = `__${String(name)}`

		return function (this: any, initialValue: unknown) {
			this[dataPropertyName] = initialValue

			Object.defineProperty(this, name, {
				get() {
					console.log(`Reading and returning value for property ${String(name)}, ${this[dataPropertyName]}`)
					return this[dataPropertyName]
				},
				set(newValue) {
					console.log(`Setting value for property ${String(name)} to ${newValue}`)
					this[dataPropertyName] = newValue
				},
				enumerable: true,
				configurable: true
			})

			return undefined
		}
	}
}

// Test class and usage remains the same
class Item {
	@InstanceProperty()
	public value: number = 5

	constructor(value: number) {
		this.value = value
	}
}

const instance = new Item(20)
instance.value = 10

console.log(Object.getOwnPropertyDescriptor(instance, "value"))
