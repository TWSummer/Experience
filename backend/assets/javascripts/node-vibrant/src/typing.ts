import * as Bluebird from 'bluebird'
import { Palette, Swatch } from './color'
import Builder from './builder'

export interface VibrantStatic {
    from(src: ImageSource): Builder
}

export interface Callback<T> {
    (err?: Error, result?: T): void
}

export type ImageCallback = Callback<Image>

export type ImageSource = string | HTMLImageElement | Buffer

export type Pixels = Uint8ClampedArray | Buffer
export interface ImageData {
    data: Pixels,
    width: number,
    height: number
}

export interface Image {
    load(image: ImageSource): Bluebird<Image>
    clear(): void
    update(imageData: ImageData): void
    getWidth(): number
    getHeight(): number
    resize(targetWidth: number, targetHeight: number, ratio: number): void
    getPixelCount(): number
    getImageData(): ImageData
    remove(): void
    scaleDown(opts: Options): void
}

export type Resolvable<T> = T | Bluebird<T>

export interface ImageClass {
    new (): Image
}

export interface Filter {
    (red: number, green: number, blue: number, alpha: number): boolean
}

export interface Quantizer {
    (pixels: Pixels, opts: Options): Resolvable<Array<Swatch>>
}

export interface Generator {
    (swatches: Array<Swatch>, opts?: Object): Resolvable<Palette>
}

export interface Options {
    colorCount: number
    quality: number
    maxDimension: number
    filters: Array<Filter>
    useWorker: boolean
    ImageClass: ImageClass
    quantizer: Quantizer
    generator?: Generator
}