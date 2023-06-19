import React, { useEffect, useState } from 'react';
import { Row, Col, Table, Spin,Modal,Form,Input ,Select} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CSVLink } from 'react-csv';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import moment from 'moment';
import FeatherIcon from 'feather-icons-react';
import { RecordViewWrapper } from './Style';
import { Main, TableWrapper } from '../../styled';
import {alertModal} from '../../../components/modals/antd-modals'
import { Button } from '../../../components/buttons/buttons';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { PageHeader } from '../../../components/page-headers/page-headers';
import {deleteFaq, getFaqs} from '../../../redux/faq/faqSlice'

const ViewPage = () => {
  const dispatch = useDispatch();
  const { isLoading ,faqStates} = useSelector(state => {
    return {
      isLoading: state.faqStates.loading,
      faqStates: state.faqStates,
    };
  });
  const [state, setState] = useState({
    isModalVisible: false,
    fileName: 'bodyShop',
    convertedTo: 'csv',
    selectedRowKeys: 0,
    selectedRows: [],
  });
  console.log(state);

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
  // const usersTableData = [];
  const csvData = [['id', 'question', 'answer', 'updated_at']];
  const columns = [
    {
      title: 'Question',
      dataIndex: 'question',
      key: 'question',
    },
    {
      title: 'Answer',
      dataIndex: 'answer',
      key: 'answer',
    },
    {
      title: 'Update At',
      dataIndex: 'updated_at',
      key: 'updated_at',
      render: (text)=>moment(text).fromNow()
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      width: '90px',
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setState({ ...state, selectedRowKeys, selectedRows });
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

  state.selectedRows.map((rows) => {
    const { key, question, answer, updated_at } = rows;
    return csvData.push([key, question, answer, updated_at]);
  });

  const { isModalVisible } = state;

  const warning = () => {
    alertModal.warning({
      title: 'Please Select your Required Rows!',
    });
  };

  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const xlsxExtension = '.xlsx';

  const exportToXLSX = (inputData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(inputData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + xlsxExtension);
    setState({
      ...state,
      isModalVisible: false,
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
  const { Option } = Select;
  const { fileName, convertedTo } = state;
  useEffect(() => {
    dispatch(getFaqs())
  }, [dispatch]);
  const dataSource = [];

  const handleDelete = id => {
    const confirm = window.confirm('Are you sure delete this?');
    if (confirm) {
      dispatch(
        deleteFaq({
          id,
          getData: () => {
            dispatch(getFaqs());
          },
        }),
      );
    }
    return false;
  };

  const onHandleSearch = e => {
    console.log(e.target.value)
  };

  if (faqStates?.faqs.length)
  faqStates?.faqs?.map((person, key) => {
      const { id,question,answer,updated_at } = person;
      return dataSource.push({
        key: key + 1,
        question,
        answer,
        updated_at,
        action: (
          <div className="table-actions">
            <Link className="edit" to={`/admin/faq-admin/faqs-edit/${id}`}>
              <FeatherIcon icon="edit" size={14} />
            </Link>
            &nbsp;&nbsp;&nbsp;
            <Link className="delete" onClick={() => handleDelete(id)} to="#">
              <FeatherIcon icon="trash-2" size={14} />
            </Link>
          </div>
        ),
      });
    });

  return (
    <RecordViewWrapper>
      <PageHeader
        buttons={[
          <div className="sDash_export-box">
          {state.selectedRows.length ? (
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
                        onClick={() => exportToXLSX(csvData, fileName)}
                        type="primary"
                      >
                        Eport
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
          )}
        </div>,
          <div>
          <Button className="btn-add_new" size="small" key="1" type="primary">
            <Link to="/admin/faq-admin/faqs-add">
              <FeatherIcon icon="plus" size={14} /> <span>Add New</span>
            </Link>
          </Button>
        </div>,
          <div key={1} className="search-box">
            <span className="search-icon">
              <FeatherIcon icon="search" size={14} />
            </span>
            <input onChange={onHandleSearch} type="text" name="recored-search" placeholder="Search Here" />
          </div>,
        ]}
        ghost
        title="Faqs | Faqs Management"
      />
      <Main>
        <Row gutter={15}>
          <Col className="w-100" md={24}>
            <Cards headless>
              {isLoading ? (
                <div className="spin">
                  <Spin />
                </div>
              ) : (
                <div>
                  <TableWrapper className="table-data-view table-responsive">
                    <Table
                      rowSelection={rowSelection}
                      pagination={{ pageSize: 10, showSizeChanger: true }}
                      dataSource={dataSource}
                      columns={columns}
                    />
                  </TableWrapper>
                </div>
              )}
            </Cards>
          </Col>
        </Row>
      </Main>
    </RecordViewWrapper>
  );
};

export default ViewPage;
