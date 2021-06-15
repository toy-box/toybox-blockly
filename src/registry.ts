import Blockly from 'blockly';
import 'blockly/javascript';

const ArgRex = /^args[0-9]\d*$/;

export const blockRegistry = (name: string, json: Record<string, any>, code: string) => {
  Blockly.defineBlocksWithJsonArray([{
    ...json,
    type: json.type || name
  }]);
  (Blockly as any).JavaScript[name] = (block: Blockly.Block) => {
    const args = [] as Array<{ name: string, value: any}>;
    Object.keys(json)
      .filter(key => ArgRex.test(key))
      .forEach(argsKey => {
        args.push(
          ...json[argsKey].map((arg: any) => ({
            name: arg.name,
            value: block.getFieldValue(arg.type)
          }))
        )
      });
    const fn = new Function(...args.map(arg => arg.name), `return ${code}`);
    return [fn(...args.map(arg => arg.value)), (Blockly as any).JavaScript.ORDER_NONE];
  }
}