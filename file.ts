export function InstanceProperty() {
	return function (value: any, context: ClassFieldDecoratorContext) {
		const { name } = context

		return function (this: any, initialValue: unknown) {
			let didInitialize = false
			let storedValue = initialValue

			Object.defineProperty(this, name, {
				get() {
					console.log(
						`Reading and returning value for property ${String(
							name
						)}, ${storedValue}`
					)

					return storedValue
				},
				set(newValue) {
					if (!didInitialize) {
						didInitialize = true

						if (
							newValue === undefined &&
							initialValue !== undefined
						) {
							console.log(
								`Setting value for property ${String(
									name
								)} to initial value ${initialValue}`
							)

							storedValue = initialValue
							return
						}
					}

					console.log(
						`Setting value for property ${String(
							name
						)} to ${newValue}`
					)

					storedValue = newValue
				},
				enumerable: true,
				configurable: true
			})

			console.log(context.metadata)

			return value
		}
	}
}

// Test class and usage remains the same
class Item {
	@InstanceProperty()
	public value: number = 5

	constructor(value?: number) {
		// this.value = value
	}
}

const instanceA = new Item()
const instanceB = new Item()

instanceA.value
instanceA.value = 10

instanceB.value
instanceB.value = 25

console.log(instanceA.value)
console.log(instanceB.value)

// console.log(Object.getOwnPropertyDescriptor(instance, "value"))
