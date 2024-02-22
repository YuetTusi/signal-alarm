import fs from 'fs';
import path from 'path';
import dayjs, { Dayjs } from 'dayjs';
import debounce from 'lodash/debounce';
import electron, { OpenDialogReturnValue } from 'electron';
import { FC, useEffect } from 'react';
import { App, message, Form, Table } from 'antd';
import { useModel } from '@/model';
import { Hotspot } from '@/schema/hotspot';
import { Protocol } from '@/schema/protocol';
import { FakeHotspot } from '@/schema/fake-hotspot';
import { WhiteListType } from '@/schema/white-list';
import { helper } from '@/utility/helper';
import { SearchBar } from './search-bar';
import { getColumns } from './column';
import { getTypes } from './data-source';
import {
    ActionType, HotspotTableProp, SearchFormValue
} from './prop';

const { ipcRenderer } = electron;
const { writeFile } = fs.promises;
const { join } = path;
const { useForm } = Form;

/**
 * 专项检测热点数据
 */
const HotspotTable: FC<HotspotTableProp> = ({ }) => {

    const { modal } = App.useApp();
    const [formRef] = useForm<SearchFormValue>();

    const {
        specialHotspotPageIndex,
        specialHotspotPageSize,
        specialHotspotTotal,
        specialHotspotData,
        specialHotspotLoading,
        specialDefaultHotspotName,
        querySpecialHotspotData,
        exportSpecialHotspotData,
        addWhiteList,
        setReading,
        addFakeHotspot,
        queryFakeHotspotList
    } = useModel(state => ({
        specialHotspotPageIndex: state.specialHotspotPageIndex,
        specialHotspotPageSize: state.specialHotspotPageSize,
        specialHotspotTotal: state.specialHotspotTotal,
        specialHotspotData: state.specialHotspotData,
        specialHotspotLoading: state.specialHotspotLoading,
        specialDefaultHotspotName: state.specialDefaultHotspotName,
        setReading: state.setReading,
        addWhiteList: state.addWhiteList,
        addFakeHotspot: state.addFakeHotspot,
        queryFakeHotspotList: state.queryFakeHotspotList,
        querySpecialHotspotData: state.querySpecialHotspotData,
        exportSpecialHotspotData: state.exportSpecialHotspotData
    }));

    useEffect(() => {
        querySpecialHotspotData(
            1,
            helper.PAGE_SIZE,
            {
                beginTime: dayjs().add(-1, 'w').format('YYYY-MM-DD 00:00:00'),
                endTime: dayjs().format('YYYY-MM-DD 23:59:59'),
                hotspotName: specialDefaultHotspotName, //从伪热点跳转会有此条件
                protocolTypes: helper.protocolToString([
                    Protocol.WiFi58G,
                    Protocol.WiFi24G
                ])
            }
        );
    }, [specialDefaultHotspotName]);

    /**
     * 翻页Change
     */
    const onPageChange = async (pageIndex: number, pageSize: number) => {
        const { beginTime, endTime, type, site } = formRef.getFieldsValue();
        try {
            await querySpecialHotspotData(pageIndex, pageSize, {
                beginTime: beginTime.format('YYYY-MM-DD HH:mm:ss'),
                endTime: endTime.format('YYYY-MM-DD HH:mm:ss'),
                protocolTypes: getTypes(type),
                deviceId: helper.getDeviceIdFromDropdown(site)
            });

        } catch (error) {
            console.log(error);
        }
    };

    /**
     * 查询
     */
    const onSearch = async (beginTime: Dayjs, endTime: Dayjs, hotspotName: string, type: string, deviceId?: string) => {
        try {
            await querySpecialHotspotData(1, helper.PAGE_SIZE, {
                beginTime: beginTime.format('YYYY-MM-DD HH:mm:ss'),
                endTime: endTime.format('YYYY-MM-DD HH:mm:ss'),
                hotspotName,
                protocolTypes: type,
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
    const onExport = async () => {
        message.destroy();
        const fileName = '专项数据_' + dayjs().format('YYYYMMDDHHmmss') + '.xlsx';
        const condition = formRef.getFieldsValue();
        setReading(true);
        try {
            const { filePaths }: OpenDialogReturnValue = await ipcRenderer.invoke('open-dialog', {
                title: '选择存储目录',
                properties: ['openDirectory']
            });
            if (filePaths.length > 0) {
                const data = await exportSpecialHotspotData(specialHotspotPageIndex, specialHotspotPageSize, {
                    beginTime: condition.beginTime.format('YYYY-MM-DD HH:mm:ss'),
                    endTime: condition.endTime.format('YYYY-MM-DD HH:mm:ss'),
                    hotspotName: condition.hotspotName,
                    protocolTypes: getTypes(condition.type),
                    deviceId: helper.getDeviceIdFromDropdown(condition.site)
                });
                await writeFile(join(filePaths[0], fileName), data);
                modal.success({
                    title: '导出成功',
                    content: `数据文件「${fileName}」已保存在${filePaths[0]}`,
                    centered: true,
                    okText: '确定'
                });
            } else {
                setReading(false);
            }
        } catch (error) {
            console.warn(error);
            message.warning(`导出失败（${error.message}）`);
        } finally {
            setReading(false);
        }
    };

    /**
     * 表格列Click
     */
    const onColumnClick = debounce(async (actionType: ActionType, data: Hotspot) => {

        message.destroy();
        switch (actionType) {
            case ActionType.AddToWhiteList:
                //加至白名单
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
                    width: 450,
                    centered: true,
                    title: '添加白名单',
                    content: `确认将热点「${data.ssid ?? ''} （${data.mac ?? ''}）」加入白名单？`,
                    okText: '是',
                    cancelText: '否'
                });
                break;
            case ActionType.AddToFakeHotspot:
                //加至伪热点
                modal.confirm({
                    async onOk() {
                        const now = dayjs().format('YYYY-MM-DD HH:mm:ss');
                        const next = new FakeHotspot();
                        next.hotspotName = data.ssid ?? '';
                        next.fakeMac = '';
                        next.realMac = data.mac;
                        next.count = 0;
                        next.isDeleted = 0;
                        next.createTime = now;
                        next.updateTime = now;
                        try {
                            const res = await addFakeHotspot(next);
                            if (res !== null && res.code === 200) {
                                message.success('成功添加至伪热点');
                                queryFakeHotspotList();
                            } else {
                                message.warning('添加失败');
                            }
                        } catch (error) {
                            console.warn(error);
                            message.warning(`添加失败 ${error.message}`);
                        }
                    },
                    width: 450,
                    centered: true,
                    title: '添加伪热点',
                    content: `确认将热点「${data.ssid ?? ''} （${data.mac ?? ''}）」加入伪热点？`,
                    okText: '是',
                    cancelText: '否'
                });
                break;
            default:
                console.warn('无列类型命中');
                break;
        }
    }, 500, { leading: true, trailing: false });

    return <>
        <SearchBar
            formRef={formRef}
            onExport={onExport}
            onSearch={onSearch} />
        <Table<Hotspot>
            columns={getColumns(onColumnClick)}
            dataSource={specialHotspotData}
            loading={specialHotspotLoading}
            pagination={{
                onChange: onPageChange,
                total: specialHotspotTotal,
                current: specialHotspotPageIndex,
                pageSize: specialHotspotPageSize,
                showSizeChanger: false,
                showTotal: (total) => `共${total}条`
            }}
            scroll={{ x: 1660 }}
            rowKey="id"
            size="middle"
        />
    </>
};

HotspotTable.defaultProps = {};

export { HotspotTable };