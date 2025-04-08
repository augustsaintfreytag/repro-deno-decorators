type ClassAccessorDecoratorValue<T> = {
	get: () => T
	set: (value: T) => void
}
export function InstanceProperty<T = any>() {
	return function (
		value: ClassAccessorDecoratorValue<T>,
		context: ClassAccessorDecoratorContext
	) {
		const { get, set } = value
		const { name } = context

		return {
			init(initialValue: T) {
				return initialValue
			},
			get() {
				const currentValue = get.call(this)
				console.log(
					`Reading property ${String(name)} from instance ${
						this.constructor.name
					} with value '${currentValue}'.`
				)

				return currentValue
			},
			set(newValue: T) {
				const currentValue = get.call(this)
				console.log(
					`Writing property ${String(name)} from instance ${
						this.constructor.name
					} with value '${currentValue}' to '${newValue}'.`
				)

				set.call(this, newValue)
			}
		}
	}
}

// Test class and usage remains the same
class Item {
	@InstanceProperty()
	public accessor value: number = 5

	constructor(value?: number) {
		if (value !== undefined) {
			this.value = value
		}
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

console.log(Object.getOwnPropertyDescriptor(instanceA, "value"))
console.log(Object.getOwnPropertyDescriptor(instanceB, "value"))
