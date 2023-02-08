import { Button } from "@mui/material";
import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { Form, FormControl, InputGroup } from "react-bootstrap";
import { DataPublisher } from "../../../utils/DataPublisher";

const BatchProcessor = () => {
  const [data, setData] = useState(null);
  const [editorValidationErrors, setEditorValidationErrors] = useState([]);
  const [schemaValidationErrors, setSchemaValidationErrors] = useState([]);
  const [file, setFile] = useState(null);
  const [emptyEditor, setEmptyEditor] = useState(false);
  const [isValidSchema, setIsValidSchema] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadingError, setUploadingError] = useState("");

  const handleFileSelection = event => {
    const selectedFile = event.target.files[0];
    if (selectedFile.name.split(".").pop().toLowerCase() == "json") {
      setFile(selectedFile);
    } else {
      alert("Only JSON file is accepted!!! Try Again.");
    }
  };

  const loadFileData = () => {
    if (file !== null) {
      let fileReader = new FileReader();
      fileReader.readAsText(file);
      fileReader.onload = function() {
        setData(JSON.parse(fileReader.result));
      };
      fileReader.onerror = function() {
        alert(fileReader.error);
      };
    }
  };

  const handleEditorChange = (value, event) => {
    if (value.length === 0) {
      setEmptyEditor(true);
    } else if (emptyEditor) {
      setEmptyEditor(false);
    }
    try {
      setData(JSON.parse(value));
    } catch (exp) {
      console.log(exp.message);
    }
  };

  const handleEditorValidation = markers => {
    if (markers.length > 0) {
      const errors = markers.map(
        marker =>
          `${marker.message} At Line ${marker.startLineNumber}` +
          (marker.startLineNumber == marker.endLineNumber
            ? ""
            : `-${marker.endLineNumber}`)
      );
      setEditorValidationErrors(errors);
    } else {
      setEditorValidationErrors([]);
    }
  };

  const handleSchemaValidation = e => {
    e.preventDefault();
    const dataAttributes = Object.keys(data);
    const errors = [];
    if (dataAttributes.includes("items") && dataAttributes.includes("table")) {
      const table = data["table"];
      const items = data["items"];
      for (let i = 0; i < items.length; i++) {
        const schemaValidationResult = DataPublisher.validateSchema(
          items[i],
          table
        );
        errors.push(...schemaValidationResult);
        if (schemaValidationResult.length !== 0) {
          break;
        }
      }
    } else {
      if (!dataAttributes.includes("items")) {
        errors.push("Missing: Data does not have items.");
      }
      if (!dataAttributes.includes("table")) {
        errors.push("Missing: Data does not have table name.");
      }
    }
    if (errors.length !== 0) {
      setSchemaValidationErrors(errors);
      setIsValidSchema(false);
    } else {
      setSchemaValidationErrors([]);
      setIsValidSchema(true);
    }
  };

  const handleSendData = e => {
    e.preventDefault();
    setUploading(true);
    setUploadingError("");
    const tableName = data["table"];
    const dataItems = data["items"];
    if (dataItems !== null && dataItems.length !== 0) {
      for (let i = 0; i < dataItems.length; i++) {
        try {
          DataPublisher.publishData(tableName, dataItems[i]);
        } catch (err) {
          setUploadingError(err.message);
          break;
        }
      }
    }
    if (uploadingError.length === 0) {
      setData(null);
    }
    setUploading(false);
  };

  return (
    <div>
      <div className="row mb-3">
        <div className="col mt-3">
          <Form>
            <Form.Group>
              <InputGroup>
                <FormControl
                  required
                  autoComplete="off"
                  aria-describedby="file"
                  type="file"
                  name="data-file"
                  onChange={handleFileSelection}
                />
                <Button
                  className="ms-3"
                  variant="contained"
                  color="primary"
                  disabled={file === null}
                  onClick={loadFileData}
                >
                  Load Data
                </Button>
              </InputGroup>
            </Form.Group>
          </Form>
        </div>
        <div className="col-auto mt-3">
          <Form>
            <Form.Group>
              <InputGroup>
                <Button
                  className="ms-3"
                  variant="contained"
                  color="primary"
                  disabled={
                    data == null ||
                    editorValidationErrors.length !== 0 ||
                    emptyEditor
                  }
                  onClick={handleSchemaValidation}
                >
                  Validate
                </Button>
                {!uploading &&
                  <Button
                    className="ms-3"
                    variant="contained"
                    color="primary"
                    disabled={
                      editorValidationErrors.length !== 0 ||
                      schemaValidationErrors.length !== 0 ||
                      data == null ||
                      emptyEditor ||
                      uploading ||
                      !isValidSchema
                    }
                    onClick={handleSendData}
                  >
                    SEND Data
                  </Button>}
              </InputGroup>
            </Form.Group>
          </Form>
        </div>
        {uploading &&
          <div className="col-auto mt-3">
            <div className="spinner-border" role="status" />
          </div>}
      </div>
      <div className="row">
        {data !== null &&
          <Editor
            className="border border-2"
            height="65vh"
            defaultLanguage="json"
            value={JSON.stringify(data, null, 4)}
            onChange={handleEditorChange}
            onValidate={handleEditorValidation}
          />}
        <div className="mt-3">
          {editorValidationErrors.map((error, index) => {
            return (
              <div key={index}>
                <span className="text-danger">*{error}</span> <br />
              </div>
            );
          })}
          {schemaValidationErrors.map((error, index) => {
            return (
              <div key={index}>
                <span className="text-danger">*{error}</span> <br />
              </div>
            );
          })}
          {uploadingError.length !== 0 &&
            <div key={index}>
              <span className="text-danger">*{uploadingError}</span> <br />
            </div>}
        </div>
      </div>
    </div>
  );
};

export default BatchProcessor;
