/**
 * Creates & maintains the log
 */

import * as fs from "fs";
import * as path from "path";

class Log {
  public baseDir: string;
  public fileName: string;
  public linePrefix: string;

  public today: Date = new Date();

  constructor () {
    const _dateString = `${this.today.getFullYear()}-${
      this.today.getMonth() + 1
    }-${this.today.getDate()}`;
    const _timeString = `${this.today.getHours()}:${this.today.getMinutes()}:${this.today.getSeconds()}`;

    this.baseDir = path.join(__dirname, "../../../.logs/");

    this.fileName = `${_dateString}.log`;
    this.linePrefix = `[${_dateString} ${_timeString}]`;
  }

  // Adds INFO prefix string to the log string
  public info (_loggable: Object): void {
    this.addLog("INFO", _loggable);
  }

  // Adds WARN prefix string to the log string
  public warn (_loggable: Object): void {
    this.addLog("WARN", _loggable);
  }

  // Adds ERROR prefix string to the log string
  public error (_loggable: Object): void {
    // Line break and show the first line
    console.log("\x1b[31m%s\x1b[0m", "[ERROR] :: " + _loggable);

    this.addLog("ERROR", _loggable);
  }

  // Adds the custom prefix string to the log string
  public custom (_filename: string, _loggable: Object): void {
    this.addLog(_filename, _loggable);
  }

  /**
   * Creates the file if does not exist, and
   * append the log kind & string into the file.
   */
  private addLog (_kind: string, _loggable: Object): void {
    const _that = this;
    _kind = _kind.toUpperCase();
    if (process.env.NODE_ENV === "test") {
      return;
    }
    fs.open(
      `${_that.baseDir}${_that.fileName}`,
      "a",
      (_err, _fileDescriptor) => {
        if (!_err && _fileDescriptor) {
          // Append to file and close it
          fs.appendFile(
            _fileDescriptor,
            `${_that.linePrefix} [${_kind}] ${JSON.stringify(_loggable)}\n`,
            (_err) => {
              if (!_err) {
                fs.close(_fileDescriptor, (_err) => {
                  if (!_err) {
                    return true;
                  } else {
                    return console.log(
                      "\x1b[31m%s\x1b[0m",
                      "Error closing log file that was being appended"
                    );
                  }
                });
              } else {
                return console.log(
                  "\x1b[31m%s\x1b[0m",
                  "Error appending to the log file"
                );
              }
            }
          );
        } else {
          return console.log(
            "\x1b[31m%s\x1b[0m",
            "Error couldn't open the log file for appending"
          );
        }
      }
    );
  }
}

// export default Log;
export default new Log();
