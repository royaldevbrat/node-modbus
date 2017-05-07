let ModbusRequestBody = require('./request-body.js')

/** Write Single Register Request Body
 * @extends ModbusRequestBody
 */
class WriteSingleRegisterRequestBody extends ModbusRequestBody {

  /** Create a new Write Single Register Request Body.
   * @param {Number} address Write address.
   * @param {Number} value Value to be written.
   * @throws {InvalidStartAddressException} When address is larger than 0xFFFF.
   */
  constructor (address, value) {
    super(0x06)
    if (address > 0xFFFF) {
      throw new Error('InvalidStartAddress')
    }
    if (!Number.isInteger(value) || value < 0 || value > 0xFFFF) {
      throw new Error('InvalidValue')
    }
    this._address = address
    this._value = value
  }

  /** Address to be written. */
  get address () {
    return this._address
  }

  /** Value to be written. */
  get value () {
    return this._value
  }

  createPayload () {
    let payload = Buffer.alloc(5)
    payload.writeUInt8(this._fc, 0) // function code
    payload.writeUInt16BE(this._address, 1) // output address
    payload.writeUInt16BE(this._value, 3) // output value
  }

  get byteCount () {
    return 5
  }
}

module.exports = WriteSingleRegisterRequestBody
