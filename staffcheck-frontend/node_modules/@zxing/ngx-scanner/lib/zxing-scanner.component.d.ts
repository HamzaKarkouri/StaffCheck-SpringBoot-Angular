import { ElementRef, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { BarcodeFormat, DecodeHintType, Exception, Result } from '@zxing/library';
import { BrowserMultiFormatContinuousReader } from './browser-multi-format-continuous-reader';
import * as i0 from "@angular/core";
export declare class ZXingScannerComponent implements OnInit, OnDestroy {
    /**
     * Supported Hints map.
     */
    private _hints;
    /**
     * The ZXing code reader.
     */
    private _codeReader;
    /**
     * The device that should be used to scan things.
     */
    private _device;
    /**
     * The device that should be used to scan things.
     */
    private _enabled;
    /**
     *
     */
    private _isAutostarting;
    /**
     * Has `navigator` access.
     */
    private hasNavigator;
    /**
     * Says if some native API is supported.
     */
    private isMediaDevicesSupported;
    /**
     * If the user-agent allowed the use of the camera or not.
     */
    private hasPermission;
    /**
     * Unsubscribe to stop scanning.
     */
    private _scanSubscription?;
    /**
     * Reference to the preview element, should be the `video` tag.
     */
    previewElemRef: ElementRef<HTMLVideoElement>;
    /**
     * Enable or disable autofocus of the camera (might have an impact on performance)
     */
    autofocusEnabled: boolean;
    /**
     * Delay between attempts to decode (default is 500ms)
     */
    timeBetweenScans: number;
    /**
     * Delay between successful decode (default is 500ms)
     */
    delayBetweenScanSuccess: number;
    /**
     * Emits when and if the scanner is autostarted.
     */
    autostarted: EventEmitter<void>;
    /**
     * True during autostart and false after. It will be null if won't autostart at all.
     */
    autostarting: EventEmitter<boolean>;
    /**
     * If the scanner should autostart with the first available device.
     */
    autostart: boolean;
    /**
     * How the preview element should be fit inside the :host container.
     */
    previewFitMode: 'fill' | 'contain' | 'cover' | 'scale-down' | 'none';
    /**
     * Url of the HTML video poster
     */
    poster: string;
    /**
     * Emits events when the torch compatibility is changed.
     */
    torchCompatible: EventEmitter<boolean>;
    /**
     * Emits events when a scan is successful performed, will inject the string value of the QR-code to the callback.
     */
    scanSuccess: EventEmitter<string>;
    /**
     * Emits events when a scan fails without errors, useful to know how much scan tries where made.
     */
    scanFailure: EventEmitter<Exception | undefined>;
    /**
     * Emits events when a scan throws some error, will inject the error to the callback.
     */
    scanError: EventEmitter<Error>;
    /**
     * Emits events when a scan is performed, will inject the Result value of the QR-code scan (if available) to the callback.
     */
    scanComplete: EventEmitter<Result>;
    /**
     * Emits events when no cameras are found, will inject an exception (if available) to the callback.
     */
    camerasFound: EventEmitter<MediaDeviceInfo[]>;
    /**
     * Emits events when no cameras are found, will inject an exception (if available) to the callback.
     */
    camerasNotFound: EventEmitter<any>;
    /**
     * Emits events when the users answers for permission.
     */
    permissionResponse: EventEmitter<boolean>;
    /**
     * Emits events when has devices status is update.
     */
    hasDevices: EventEmitter<boolean>;
    private _ready;
    private _devicePreStart;
    /**
     * Exposes the current code reader, so the user can use it's APIs.
     */
    get codeReader(): BrowserMultiFormatContinuousReader;
    /**
     * User device input
     */
    set device(device: MediaDeviceInfo | undefined);
    /**
     * Emits when the current device is changed.
     */
    deviceChange: EventEmitter<MediaDeviceInfo>;
    /**
     * User device accessor.
     */
    get device(): MediaDeviceInfo | undefined;
    /**
     * Returns all the registered formats.
     */
    get formats(): BarcodeFormat[];
    /**
     * Registers formats the scanner should support.
     *
     * @param input BarcodeFormat or case-insensitive string array.
     */
    set formats(input: BarcodeFormat[]);
    /**
     * Returns all the registered hints.
     */
    get hints(): Map<DecodeHintType, any>;
    /**
     * Does what it takes to set the hints.
     */
    set hints(hints: Map<DecodeHintType, any>);
    /**
     * Sets the desired constraints in all video tracks.
     * @experimental
     */
    set videoConstraints(constraints: MediaTrackConstraints);
    /**
     *
     */
    set isAutostarting(state: boolean);
    /**
     *
     */
    get isAutostarting(): boolean;
    /**
     * Can turn on/off the device flashlight.
     *
     * @experimental Torch/Flash APIs are not stable in all browsers, it may be buggy!
     */
    set torch(onOff: boolean);
    /**
     * Starts and Stops the scanning.
     */
    set enable(enabled: boolean);
    /**
     * Tells if the scanner is enabled or not.
     */
    get enabled(): boolean;
    /**
     * If is `tryHarder` enabled.
     */
    get tryHarder(): boolean;
    /**
     * Enable/disable tryHarder hint.
     */
    set tryHarder(enable: boolean);
    /**
     * Constructor to build the object and do some DI.
     */
    constructor();
    /**
     * Gets and registers all cameras.
     */
    askForPermission(): Promise<boolean>;
    /**
     *
     */
    getAnyVideoDevice(): Promise<MediaStream>;
    /**
     * Terminates a stream and it's tracks.
     */
    private terminateStream;
    private init;
    /**
     * Initializes the component without starting the scanner.
     */
    private initAutostartOff;
    /**
     * Initializes the component and starts the scanner.
     * Permissions are asked to accomplish that.
     */
    private initAutostartOn;
    /**
     * Checks if the given device is the current defined one.
     */
    isCurrentDevice(device?: MediaDeviceInfo): boolean;
    /**
     * Executes some actions before destroy the component.
     */
    ngOnDestroy(): void;
    /**
     *
     */
    ngOnInit(): void;
    /**
     * Stops the scanning, if any.
     */
    scanStop(): void;
    /**
     * Stops the scanning, if any.
     */
    scanStart(): void;
    /**
     * Stops old `codeReader` and starts scanning in a new one.
     */
    restart(): void;
    /**
     * Discovers and updates known video input devices.
     */
    updateVideoInputDevices(): Promise<MediaDeviceInfo[]>;
    /**
     * Starts the scanner with the back camera otherwise take the last
     * available device.
     */
    private autostartScanner;
    /**
     * Dispatches the scan success event.
     *
     * @param result the scan result.
     */
    private dispatchScanSuccess;
    /**
     * Dispatches the scan failure event.
     */
    private dispatchScanFailure;
    /**
     * Dispatches the scan error event.
     *
     * @param error the error thing.
     */
    private dispatchScanError;
    /**
     * Dispatches the scan event.
     *
     * @param result the scan result.
     */
    private dispatchScanComplete;
    /**
     * Returns the filtered permission.
     */
    private handlePermissionException;
    /**
     * Returns a valid BarcodeFormat or fails.
     */
    private getBarcodeFormatOrFail;
    /**
     * Return a code reader, create one if non exist
     */
    private getCodeReader;
    /**
     * Starts the continuous scanning for the given device.
     *
     * @param deviceId The deviceId from the device.
     */
    private scanFromDevice;
    /**
     * Handles decode errors.
     */
    private _onDecodeError;
    /**
     * Handles decode results.
     */
    private _onDecodeResult;
    /**
     * Stops the code reader and returns the previous selected device.
     */
    private _reset;
    /**
     * Resets the scanner and emits device change.
     */
    reset(): void;
    /**
     * Sets the current device.
     */
    private setDevice;
    /**
     * Sets the permission value and emits the event.
     */
    private setPermission;
    static ɵfac: i0.ɵɵFactoryDeclaration<ZXingScannerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ZXingScannerComponent, "zxing-scanner", never, { "autofocusEnabled": { "alias": "autofocusEnabled"; "required": false; }; "timeBetweenScans": { "alias": "timeBetweenScans"; "required": false; }; "delayBetweenScanSuccess": { "alias": "delayBetweenScanSuccess"; "required": false; }; "autostart": { "alias": "autostart"; "required": false; }; "previewFitMode": { "alias": "previewFitMode"; "required": false; }; "poster": { "alias": "poster"; "required": false; }; "device": { "alias": "device"; "required": false; }; "formats": { "alias": "formats"; "required": false; }; "videoConstraints": { "alias": "videoConstraints"; "required": false; }; "torch": { "alias": "torch"; "required": false; }; "enable": { "alias": "enable"; "required": false; }; "tryHarder": { "alias": "tryHarder"; "required": false; }; }, { "autostarted": "autostarted"; "autostarting": "autostarting"; "torchCompatible": "torchCompatible"; "scanSuccess": "scanSuccess"; "scanFailure": "scanFailure"; "scanError": "scanError"; "scanComplete": "scanComplete"; "camerasFound": "camerasFound"; "camerasNotFound": "camerasNotFound"; "permissionResponse": "permissionResponse"; "hasDevices": "hasDevices"; "deviceChange": "deviceChange"; }, never, never, false, never>;
}
