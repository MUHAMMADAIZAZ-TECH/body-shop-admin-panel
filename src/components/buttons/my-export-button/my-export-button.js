import React from 'react'
import { Input, Modal,Select,Form } from 'antd';
import { CSVLink } from 'react-csv';
import PropTypes from 'prop-types';
import FeatherIcon from 'feather-icons-react';
import { alertModal } from '../../modals/antd-modals';
import { Button } from '../buttons';

const { Option } = Select;
const MYExportButton = ({state,setState,exportToXLSX,csvData}) => {
    const { fileName, convertedTo } = state;
    const { isModalVisible } = state;
  
    const showModal = () => {
      setState({
        ...state,
        isModalVisible: true,
      });
    };
    const handleCancel = () => {
      setState({
        ...state,
        isModalVisible: false,
      });
    };
    const warning = () => {
        alertModal.warning({
          title: 'Please Select your Required Rows!',
        });
      };
    
      const updateFileName = (e) => {
        setState({
          ...state,
          fileName: e.target.value,
        });
      };
      const updateFileType = (value) => {
        setState({
          ...state,
          convertedTo: value,
        });
      };
  return (
    state.selectedRows.length ? (
        <>
          <Button className="btn-export" onClick={showModal}  
          size="small" 
          type="white">
             <FeatherIcon icon="download" size={14} />
            Export
          </Button>
          <Modal
            title="Export File"
            wrapClassName="sDash_export-wrap"
            visible={isModalVisible}
            footer={null}
            onCancel={handleCancel}
          >
            <Form name="contact">
              <Form.Item name="f_name">
                <Input placeholder="File Name" value={fileName} onChange={updateFileName} />
              </Form.Item>
              <Form.Item initialValue="CSV" name="f_type">
                <Select onChange={updateFileType}>
                  <Option value="csv">CSV</Option>
                  <Option value="xlxs">xlxs</Option>
                </Select>
              </Form.Item>
              <div className="sDash-button-grp">
                {convertedTo === 'csv' ? (
                  <CSVLink filename={`${fileName}.csv`} data={csvData}>
                    <Button onClick={handleCancel} className="btn-export" type="primary">
                      Export
                    </Button>
                  </CSVLink>
                ) : (
                  <Button
                    className="btn-export"
                    onClick={() => exportToXLSX(csvData, fileName,setState,state)}
                    type="primary"
                  >
                    Export
                  </Button>
                )}
                <Button htmlType="submit" onClick={handleCancel} size="default" type="white" outlined>
                  Cancel
                </Button>
              </div>
            </Form>
          </Modal>
        </>
      ) : (
        <Button className="btn-export"  size="small"  onClick={warning} type="white">
           <FeatherIcon icon="download" size={14} />
          Export
        </Button>
      )
  )
}

MYExportButton.propTypes = {
    state: PropTypes.shape({
      fileName: PropTypes.string,
      convertedTo: PropTypes.string,
      isModalVisible: PropTypes.bool,
      selectedRows: PropTypes.arrayOf(PropTypes.any),
    }).isRequired,
    setState: PropTypes.func.isRequired,
    exportToXLSX: PropTypes.func.isRequired,
    csvData: PropTypes.arrayOf(PropTypes.any).isRequired,
  };
  
export default MYExportButton;