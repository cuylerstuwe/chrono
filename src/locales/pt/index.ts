import { includeCommonConfiguration } from "../../configurations";
import { ParsedResult, ParsingOption } from "../../index";
import { Chrono, Configuration } from "../../chrono";
import SlashDateFormatParser from "../../common/parsers/SlashDateFormatParser";
import PTWeekdayParser from "./parsers/PTWeekdayParser";
import PTTimeExpressionParser from "./parsers/PTTimeExpressionParser";
import PTMergeDateTimeRefiner from "./refiners/PTMergeDateTimeRefiner";
import PTMergeDateRangeRefiner from "./refiners/PTMergeDateRangeRefiner";
import PTMonthNameLittleEndianParser from "./parsers/PTMonthNameLittleEndianParser";

// Shortcuts
export const casual = new Chrono(createCasualConfiguration());
export const strict = new Chrono(createConfiguration(true));

export function parse(text: string, ref?: Date, option?: ParsingOption): ParsedResult[] {
    return casual.parse(text, ref, option);
}

export function parseDate(text: string, ref?: Date, option?: ParsingOption): Date {
    return casual.parseDate(text, ref, option);
}

export function createCasualConfiguration(littleEndian = true): Configuration {
    const option = createConfiguration(false, littleEndian);
    return option;
}

export function createConfiguration(strictMode = true, littleEndian = true): Configuration {
    return includeCommonConfiguration(
        {
            parsers: [
                new SlashDateFormatParser(littleEndian),
                new PTWeekdayParser(),
                new PTTimeExpressionParser(),
                new PTMonthNameLittleEndianParser(),
            ],
            refiners: [new PTMergeDateTimeRefiner(), new PTMergeDateRangeRefiner()],
        },
        strictMode
    );
}
