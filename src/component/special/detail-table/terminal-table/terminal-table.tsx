import debounce from 'lodash/debounce';
import fs from 'fs';
import path from 'path';
import dayjs, { Dayjs } from 'dayjs';
import electron, { OpenDialogReturnValue } from 'electron';
import { FC, useEffect } from 'react';
import { App, message, Table } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useModel } from '@/model';
import { Terminal } from '@/schema/terminal';
import { Protocol } from '@/schema/protocol';
import { WhiteListType } from '@/schema/white-list';
import { helper } from '@/utility/helper';
import { SearchBar } from './search-bar';
import { getColumns } from './column';
import { getTypes } from './data-source';
import { ActionType, SearchFormValue, TerminalTableProp } from './prop';


const { ipcRenderer } = electron;
const { writeFile } = fs.promises;
const { join } = path;

/**
 * 专项检测终端数据
 */
const TerminalTable: FC<TerminalTableProp> = () => {

    const { modal } = App.useApp();
    const [formRef] = useForm<SearchFormValue>();

    useEffect(() => {
        querySpecialTerminalData(1, helper.PAGE_SIZE, {
            beginTime: dayjs().format('YYYY-MM-DD 00:00:00'),
            endTime: dayjs().format('YYYY-MM-DD 23:59:59'),
            type: helper.protocolToString([
                Protocol.WiFi24G,
                Protocol.WiFi58G
            ])
        });
    }, []);

    const {
        specialTerminalPageIndex,
        specialTerminalPageSize,
        specialTerminalTotal,
        specialTerminalData,
        specialTerminalLoading,
        addWhiteList,
        querySpecialTerminalData,
        exportSpecialTerminalData
    } = useModel(state => ({
        specialTerminalPageIndex: state.specialTerminalPageIndex,
        specialTerminalPageSize: state.specialTerminalPageSize,
        specialTerminalTotal: state.specialTerminalTotal,
        specialTerminalData: state.specialTerminalData,
        specialTerminalLoading: state.specialTerminalLoading,
        addWhiteList: state.addWhiteList,
        querySpecialTerminalData: state.querySpecialTerminalData,
        exportSpecialTerminalData: state.exportSpecialTerminalData
    }));

    /**
     * 翻页Change
     */
    const onPageChange = async (pageIndex: number, pageSize: number) => {
        const { beginTime, endTime, type, mac, site } = formRef.getFieldsValue();
        try {
            await querySpecialTerminalData(pageIndex, pageSize, {
                beginTime: beginTime.format('YYYY-MM-DD HH:mm:ss'),
                endTime: endTime.format('YYYY-MM-DD HH:mm:ss'),
                type: getTypes(type),
                mac,
                deviceId: helper.getDeviceIdFromDropdown(site)
            });
        } catch (error) {
            console.warn(error);
        }
    };

    /**
     * 查询
     * @param beginTime 起始时间
     * @param endTime 结束时间
     * @param type 枚举
     */
    const onSearch = async (beginTime: Dayjs, endTime: Dayjs, type: string, mac: string, deviceId?: string) => {
        try {
            await querySpecialTerminalData(1, helper.PAGE_SIZE, {
                beginTime: beginTime.format('YYYY-MM-DD HH:mm:ss'),
                endTime: endTime.format('YYYY-MM-DD HH:mm:ss'),
                type,
                mac,
                deviceId
            });
        } catch (error) {
            console.warn(error);
        }
    };

    /**
     * 导出
     * @param beginTime 起始时间
     * @param endTime 结束时间
     */
    const onExport = async (beginTime: Dayjs, endTime: Dayjs, type: string, deviceId?: string) => {
        message.destroy();
        const fileName = '专项数据_' + dayjs().format('YYYYMMDDHHmmss') + '.xlsx';
        try {
            const { filePaths }: OpenDialogReturnValue = await ipcRenderer.invoke('open-dialog', {
                title: '选择存储目录',
                properties: ['openDirectory']
            });
            if (filePaths.length > 0) {
                const data = await exportSpecialTerminalData(specialTerminalPageIndex, specialTerminalPageSize, {
                    beginTime: beginTime.format('YYYY-MM-DD HH:mm:ss'),
                    endTime: endTime.format('YYYY-MM-DD HH:mm:ss'),
                    type,
                    deviceId
                });
                await writeFile(join(filePaths[0], fileName), data);
                modal.success({
                    title: '导出成功',
                    content: `数据文件「${fileName}」已保存在${filePaths[0]}`,
                    centered: true,
                    okText: '确定'
                });
            }
        } catch (error) {
            console.warn(error);
            message.warning(`导出失败（${error.message}）`);
        }
    };

    /**
     * 表格列Click
     */
    const onColumnClick = debounce(async (actionType: ActionType, data: Terminal) => {

        message.destroy();
        switch (actionType) {
            case ActionType.AddToWhiteList:
                modal.confirm({
                    async onOk() {
                        try {
                            const res = await addWhiteList({
                                type: WhiteListType.MAC,
                                mac: data.mac,
                                status: 0,
                                startFreq: '',
                                endFreq: ''
                            });
                            if (res !== null && res.code === 200) {
                                message.success('成功添加至白名单');
                            } else {
                                message.warning('添加失败');
                            }
                        } catch (error) {
                            console.warn(error);
                            message.warning(`添加失败 ${error.message}`);
                        }
                    },
                    centered: true,
                    title: '白名单',
                    content: `确认将「${data.protocolType === Protocol.WiFi24G ? '终端2.4G' : '终端5.8G'} ${data.mac}」加入白名单？`,
                    okText: '是',
                    cancelText: '否'
                });
                break;
            default:
                break;
        }
    }, 500, { leading: true, trailing: false });

    return <>
        <SearchBar
            formRef={formRef}
            onExport={onExport}
            onSearch={onSearch} />
        <Table<Terminal>
            columns={getColumns(onColumnClick)}
            dataSource={specialTerminalData}
            loading={specialTerminalLoading}
            pagination={{
                onChange: onPageChange,
                total: specialTerminalTotal,
                current: specialTerminalPageIndex,
                pageSize: specialTerminalPageSize,
                showSizeChanger: false,
                showTotal: (total) => `共${total}条`
            }}
            scroll={{ x: 'max-content' }}
            rowKey="id"
            size="middle"
        />
    </>
};

TerminalTable.defaultProps = {};

export { TerminalTable };