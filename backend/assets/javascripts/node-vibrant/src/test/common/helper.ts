import { expect } from 'chai'
import { VibrantStatic } from '../../typing'
import path = require('path')
import Promise = require('bluebird')
import { Palette, Swatch } from '../../color'
import util = require('../../util')
import _ = require('lodash')
import {
    REFERENCE_PALETTE,
    TARGETS,
    TEST_PORT,
    SAMPLES,
    Sample,
    SamplePathKey
} from './data'

import { table, getBorderCharacters } from 'table'


const TABLE_OPTS = {
    border: getBorderCharacters('void')
}

const TABLE_HEADER = ['Swatch', 'Actual'].concat(...TARGETS.map((t) => [t, 'Status']))



const displayColorDiffTable = (p: string, diff: string[][]) => {
    console.log(`Palette Diffrence of ${p}`)
    diff.unshift(TABLE_HEADER)
    console.log(table(diff, TABLE_OPTS))
}

const paletteCallback = (sample: Sample, done?: MochaDone) =>
    (err: Error, palette?: Palette) => {
        if (err != null) { throw err }
        expect(palette, 'palette should be returned').not.to.be.null

        let failCount = 0
        let testWithTarget = (name: string, actual: Swatch, target: string) => {
            let key = sample.i.toString()
            let expected = REFERENCE_PALETTE[target][key][name]
            let result = {
                target,
                expected: expected != null ? expected : 'null',
                status: 'N/A',
                diff: -1
            }

            if (actual === null) {
                expect(expected, `${name} color from '${target}' was expected`).to.be.null
            }
            if (expected === null) {
                expect(actual, `${name} color form '${target}' was not expected`).to.be.null
            } else {
                let actualHex = actual.getHex()
                let diff = util.hexDiff(actualHex, expected)
                result.diff = diff
                result.status = util.getColorDiffStatus(diff)
                if (diff > util.DELTAE94_DIFF_STATUS.SIMILAR) { failCount++ }
            }

            return result
        }

        let diffTable = []
        for (let name in palette) {
            var left
            let actual = palette[name]
            let colorDiff = [name, (left = (actual != null ? actual.getHex() : undefined)) != null ? left : 'null']
            for (let target of TARGETS) {
                let r = testWithTarget(name, actual, target)
                colorDiff.push(r.expected)
                colorDiff.push(`${r.status}(${r.diff.toPrecision(2)})`)
            }
            diffTable.push(colorDiff)
        }

        displayColorDiffTable(sample.filePath, diffTable)

        expect(failCount, `${failCount} colors are too diffrent from reference palettes`)
            .to.equal(0)

        if (typeof done === 'function') done()
    }

export const testVibrant = (Vibrant: VibrantStatic, sample: Sample, done: MochaDone, pathKey: SamplePathKey = 'filePath') => {
    Vibrant.from(sample[pathKey])
        .quality(1)
        .clearFilters()
        .getPalette(paletteCallback(sample, done))
}


export const testVibrantAsPromised = (Vibrant: VibrantStatic, sample: Sample, pathKey: SamplePathKey = 'filePath') => {
    let cb = paletteCallback(sample)
    return Vibrant.from(sample[pathKey])
        .quality(1)
        .clearFilters()
        .getPalette()
        .then(palette => cb(null, palette))
        .catch(e => cb(e))
}

