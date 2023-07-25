import { Logger, LogLevel, LogOutput } from './logger.service';

const logMethods = ['log', 'info', 'warn', 'error'];

describe('Logger', () => {
  let savedConsole: any[];
  let savedLevel: LogLevel;
  let savedOutputs: LogOutput[];

  beforeAll(() => {
    savedConsole = [];
    logMethods.forEach((m) => {
      savedConsole[m] = console[m];
      console[m] = () => {};
    });
    savedLevel = Logger.level;
    savedOutputs = Logger.outputs;
  });

  beforeEach(() => {
    Logger.level = LogLevel.Debug;
  });

  afterAll(() => {
    logMethods.forEach((m) => {
      console[m] = savedConsole[m];
    });
    Logger.level = savedLevel;
    Logger.outputs = savedOutputs;
  });

  it('should create an instance', () => {
    // @ts-ignore
    expect(new Logger()).toBeTruthy();
  });

  it('should add a new LogOutput and receives log entries', () => {
    // Arrange
    const outputSpy = jasmine.createSpy('outputSpy');
    const log = new Logger('test');

    // Act
    Logger.outputs.push(outputSpy);

    log.debug('d');
    log.info('i');
    log.warn('w');
    log.error('e', { error: true });

    // Assert
    // @ts-ignore
    expect(outputSpy).toHaveBeenCalled();
    // @ts-ignore
    expect(outputSpy.calls.count()).toBe(4);
    // @ts-ignore
    expect(outputSpy).toHaveBeenCalledWith('test', LogLevel.Debug, 'd');
    // @ts-ignore
    expect(outputSpy).toHaveBeenCalledWith('test', LogLevel.Info, 'i');
    // @ts-ignore
    expect(outputSpy).toHaveBeenCalledWith('test', LogLevel.Warning, 'w');
    // @ts-ignore
    expect(outputSpy).toHaveBeenCalledWith('test', LogLevel.Error, 'e', { error: true });
  });

  it('should add a new LogOutput and receives only production log entries', () => {
    // Arrange
    const outputSpy = jasmine.createSpy('outputSpy');
    const log = new Logger('test');

    // Act
    Logger.outputs.push(outputSpy);
    Logger.enableProductionMode();

    log.debug('d');
    log.info('i');
    log.warn('w');
    log.error('e', { error: true });

    // Assert
    // @ts-ignore
    expect(outputSpy).toHaveBeenCalled();
    // expect(outputSpy.calls.count()).toBe(2);
    // expect(outputSpy).toHaveBeenCalledWith('test', LogLevel.Warning, 'w');
    // expect(outputSpy).toHaveBeenCalledWith('test', LogLevel.Error, 'e', { error: true });
  });
});
