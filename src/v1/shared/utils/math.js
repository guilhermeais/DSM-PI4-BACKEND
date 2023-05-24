export class MathHelper {
  static getMode(numbers) {
    const frequencies = new Map()
    let maxFrequency = 0
    let modes = []

    for (let i = 0; i < numbers.length; i++) {
      const number = numbers[i]
      const numberFrequency = (frequencies.get(number) || 0) + 1
      frequencies.set(number, numberFrequency)

      if (numberFrequency > maxFrequency) {
        maxFrequency = numberFrequency
        modes = [number]
      } else if (numberFrequency === maxFrequency) {
        modes.push(number)
      }
    }

    return modes
  }
}
