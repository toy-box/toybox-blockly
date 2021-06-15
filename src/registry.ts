import Blockly from 'blockly';
import 'blockly/javascript';

export const blockRegistry = (name: string, json: string, code: string) => {
  Blockly.Blocks[name] = {
    init: function() {
      (this as Blockly.Block).jsonInit(json)
    }
  }
  Blockly.JavaScript[name] = (block: Blockly.Block) => {
    const fn = new Function('deps0', `return ${code}`)
    const deps0 = block.getFieldValue('input_value') || ''
    return [fn(deps0), Blockly.JavaScript.ORDER_NONE]
  }
}