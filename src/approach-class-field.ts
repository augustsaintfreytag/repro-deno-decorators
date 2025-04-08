/**
 * Property tracking decorator that logs access and modification
 */
export function InstanceProperty<T = any>() {
	return function (
		_target: any,
		context: ClassFieldDecoratorContext<any, T>
	) {
		// We need to store values in a private field
		const storageKey = Symbol(`${String(context.name)}:storage`)

		// This initializer runs when an instance is created
		context.addInitializer(function (this: any) {
			const instance = this
			console.log(`Running initializer for ${String(context.name)}.`)

			// Define the property with custom accessors on this instance
			// This happens DURING instance initialization, before the constructor runs
			Object.defineProperty(instance, context.name, {
				configurable: true,
				enumerable: true,
				get: function () {
					const value = instance[storageKey]
					console.log(
						`Reading property ${String(context.name)} from instance ${
							instance.constructor.name
						} with value '${value}'.`
					)
					return value
				},
				set: function (newValue: T) {
					const oldValue = instance[storageKey]
					console.log(
						`Writing property ${String(context.name)} from instance ${
							instance.constructor.name
						} with value '${oldValue}' to '${newValue}'.`
					)
					instance[storageKey] = newValue
				}
			})
		})

		// This function runs during field initialization
		return function (this: any, initialValue: T): T {
			// Store the initial value in our storage
			this[storageKey] = initialValue
			return initialValue
		}
	}
}

// Test class using field decorator
class Item {
	@InstanceProperty<number>()
	public value: number = 5

	constructor(value?: number) {
		if (value !== undefined) {
			this.value = value
		}
	}
}

const instanceA = new Item()
const instanceB = new Item(20)

instanceA.value
instanceA.value = 10

instanceB.value
instanceB.value = 25

console.log(instanceA.value)
console.log(instanceB.value)

console.log(Object.getOwnPropertyDescriptor(instanceA, "value"))
console.log(Object.getOwnPropertyDescriptor(instanceB, "value"))
