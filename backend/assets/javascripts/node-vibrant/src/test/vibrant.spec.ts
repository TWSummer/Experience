import {
    testVibrant,
    testVibrantAsPromised,
} from './common/helper'

import {
    createSampleServer
} from './common/server'

import http = require('http')
import {
    TEST_PORT,
    SAMPLES
} from './common/data'

import Vibrant = require('../')

describe('Palette Extraction', () => {
    describe('process samples', () =>
        SAMPLES.forEach((sample) => {
            it(`${sample.fileName} (callback)`, done => testVibrant(Vibrant, sample, done))
            it(`${sample.fileName} (Promise)`, () => testVibrantAsPromised(Vibrant, sample))
        })
    )

    describe('process remote images (http)', function () {
        let server: http.Server = null

        before(() => {
            server = createSampleServer()
            return server.listen(TEST_PORT)
        })

        after(() => server.close())

        SAMPLES.forEach((sample) => {
            it(`${sample.url} (callback)`, done => testVibrant(Vibrant, sample, done))
            it(`${sample.url} (Promise)`, () => testVibrantAsPromised(Vibrant, sample))
        })
    })
})

