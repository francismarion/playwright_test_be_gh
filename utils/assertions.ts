import { error } from "node:console";

export class Assertions {
    static isEqualsAsString(actualValue: string, expectedValue: string) {
        if(expectedValue != actualValue) {
            throw error(`${actualValue} not same as ${expectedValue}`);
        }
    }
}