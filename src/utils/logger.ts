/* eslint-disable no-console */

/**
 * Collection of logging methods. Useful for making the output easier to read and understand.
 */
export class Logger {

    public static trace(...msg: any[]): void {

        // console.log(`<T> ${new Date().toLocaleString()}:`, ...msg);

    }

    public static info(...msg: any[]): void {

        // console.info(`<I> ${new Date().toLocaleString()}:`, ...msg);

    }

    public static debug(...msg: any[]): void {

        // console.debug(`<D> ${new Date().toLocaleString()}`, ...msg);

    }

    public static warn(...msg: any[]): void {

        // console.warn(`<W> ${new Date().toLocaleString()}:`, ...msg);

    }

    public static error(...msg: any[]): void {

        console.error(`<E> ${new Date().toLocaleString()}:`, ...msg);

    }

    public static test(...msg: any[]): void {

        // console.log(`<X> ${new Date().toLocaleString()}:`, ...msg);

    }

}