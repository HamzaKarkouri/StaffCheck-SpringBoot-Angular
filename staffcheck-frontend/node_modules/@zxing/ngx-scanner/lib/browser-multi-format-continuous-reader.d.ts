import { BrowserMultiFormatReader, IScannerControls } from '@zxing/browser';
import { Observable } from 'rxjs';
import { ResultAndError } from './ResultAndError';
/**
 * Based on zxing-typescript BrowserCodeReader
 */
export declare class BrowserMultiFormatContinuousReader extends BrowserMultiFormatReader {
    /**
     * Allows to call scanner controls API while scanning.
     * Will be undefined if no scanning is running.
     */
    protected scannerControls: IScannerControls;
    /**
     * Returns the code reader scanner controls.
     */
    getScannerControls(): IScannerControls;
    /**
     * Starts the decoding from the current or a new video element.
     *
     * @param deviceId The device's to be used Id
     * @param previewEl A new video element
     */
    scanFromDeviceObservable(deviceId?: string, previewEl?: HTMLVideoElement): Promise<Observable<ResultAndError>>;
}
