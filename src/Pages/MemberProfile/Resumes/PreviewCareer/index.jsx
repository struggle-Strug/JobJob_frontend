import React from 'react'
import { Document, Page, StyleSheet, Text, View, Font, Image } from '@react-pdf/renderer'

// Register Japanese font
Font.register({
  family: 'Noto Sans JP',
  src: 'https://fonts.gstatic.com/s/notosansjp/v52/-F6jfjtqLzI2JPCgQBnw7HFyzSD-AsregP8VFBEj75s.ttf'
})

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Noto Sans JP',
    width: '100%',
    position: 'relative'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  section_1: {
    width: '60%',
  },
  date: {
    fontSize: 12,
    lineHeight: 1.5,
  },
  text: {
    fontSize: 10,
    lineHeight: 1.5,
  },
  rightAligned: {
    textAlign: 'right',
  },
  image: {
    width: 100,
    height: 100,
    marginLeft: 'auto',
  },
  tableContainer: {
    width: '100%',
    marginTop: 24,
  },
  // Add break-inside avoid equivalent for tables
  tableWrapper: {
    width: '100%',
    breakInside: 'avoid',
  }
});

const PreviewCareer = ({workHistories}) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={{width: '100%'}}>
                    <Text style={[styles.title, {color: '#343434' ,textAlign: 'center'}]}>職務経歴書</Text>
                    
                    {/* Header section - won't break */}
                    <View wrap={false}>
                        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 16}}>
                            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: 10, borderBottom: '0.2px solid black', padding: 1}}>
                                <Text style={{color: '#343434', fontSize: 12}}>氏名</Text>
                                <Text style={{color: '#343434', fontSize: 12}}>{workHistories?.name}</Text>
                            </View>
                            <Text style={{color: '#343434', fontSize: 12}}>{workHistories?.creationDate}現在</Text>
                        </View>
                    </View>

                    {/* Work History Summary - Each entry won't break */}
                    <View style={styles.tableContainer} wrap={false}>
                        <View style={{border: '1px solid black'}}>
                            <View style={{padding: 10, textAlign: 'center', backgroundColor: '#c4c4c4'}}>
                                <Text style={{color: '#343434', fontSize: 12}}>職務経歴 概略</Text>
                            </View>
                            {workHistories?.workHistories.map((work, index) => (
                                <View key={index} wrap={false} style={{display: 'flex', flexDirection: 'row', width: '100%', borderTop: '1px solid black'}}>
                                    <Text style={{color: '#343434', fontSize: 10, width: '30%',borderRight: '1px solid black',paddingLeft: 10, paddingRight: 10, paddingTop: 6, paddingBottom: 6}}>
                                        {work.startDate.split("-")[0]}年{work.startDate.split("-")[1]}月~{work.endDate.split("-")[0]}年{work.endDate.split("-")[1]}月
                                    </Text>
                                    <Text style={{color: '#343434', fontSize: 10, width: '70%',paddingLeft: 10, paddingRight: 10, paddingTop: 6, paddingBottom: 6}}>
                                        {work.companyName}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Self PR Section - Won't break */}
                    <View style={styles.tableContainer} wrap={false}>
                        <View style={{border: '1px solid black'}}>
                            <View style={{padding: 10, textAlign: 'center', backgroundColor: '#c4c4c4'}}>
                                <Text style={{color: '#343434', fontSize: 12}}>自己PR</Text>
                            </View>
                            <View style={{display: 'flex', flexDirection: 'row', width: '100%', borderTop: '1px solid black'}}>
                                <Text style={{color: '#343434', fontSize: 10, paddingLeft: 10, paddingRight: 10, paddingTop: 6, paddingBottom: 6}}>
                                    {workHistories?.selfPR}
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Qualifications Section - Each entry won't break */}
                    <View style={styles.tableContainer} wrap={false}>
                        <View style={{border: '1px solid black'}}>
                            <View style={{padding: 10, textAlign: 'center', backgroundColor: '#c4c4c4'}}>
                                <Text style={{color: '#343434', fontSize: 12}}>資格</Text>
                            </View>
                            {workHistories?.qualifications.map((qualification, index) => (
                                <View key={index} wrap={false} style={{display: 'flex', flexDirection: 'row', width: '100%', borderTop: '1px solid black'}}>
                                    <Text style={{color: '#343434', fontSize: 10, width: '30%',borderRight: '1px solid black',paddingLeft: 10, paddingRight: 10, paddingTop: 6, paddingBottom: 6}}>
                                        {qualification.year}年{qualification.month}月
                                    </Text>
                                    <Text style={{color: '#343434', fontSize: 10, width: '70%',paddingLeft: 10, paddingRight: 10, paddingTop: 6, paddingBottom: 6}}>
                                        {qualification.qualification}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Work History Details - Each company section won't break */}
                    {workHistories?.workHistories?.map((work, index) => (
                        <View key={index} style={styles.tableWrapper} wrap={false}>
                            <View style={{display: 'flex', flexDirection: 'column', width: '100%', marginTop: 24, border: '1px solid black'}}>
                                <View style={{padding: 10, textAlign: 'center', backgroundColor: '#c4c4c4'}}>
                                    <Text style={{color: '#343434', fontSize: 12}}>{work.companyName}</Text>
                                </View>
                                <View style={{display: 'flex', flexDirection: 'row', width: '100%', borderTop: '1px solid black'}}>
                                    <Text style={{color: '#343434', fontSize: 10, width: '20%',borderRight: '1px solid black',paddingLeft: 10, paddingRight: 10, paddingTop: 6, paddingBottom: 6}}>勤務期間</Text>
                                    <Text style={{color: '#343434', fontSize: 10, width: '80%',paddingLeft: 10, paddingRight: 10, paddingTop: 6, paddingBottom: 6}}>
                                        {work.startDate.split("-")[0]}年{work.startDate.split("-")[1]}月~{work.endDate.split("-")[0]}年{work.endDate.split("-")[1]}月
                                    </Text>
                                </View>
                                <View style={{display: 'flex', flexDirection: 'row', width: '100%', borderTop: '1px solid black'}}>
                                    <Text style={{color: '#343434', fontSize: 10, width: '20%',borderRight: '1px solid black',paddingLeft: 10, paddingRight: 10, paddingTop: 6, paddingBottom: 6}}>事業内容</Text>
                                    <Text style={{color: '#343434', fontSize: 10, width: '80%',paddingLeft: 10, paddingRight: 10, paddingTop: 6, paddingBottom: 6}}>{work.contents}</Text>
                                </View>
                                <View style={{display: 'flex', flexDirection: 'row', width: '100%', borderTop: '1px solid black'}}>
                                    <Text style={{color: '#343434', fontSize: 10, width: '20%',borderRight: '1px solid black',paddingLeft: 10, paddingRight: 10, paddingTop: 6, paddingBottom: 6}}>職種</Text>
                                    <Text style={{color: '#343434', fontSize: 10, width: '30%',borderRight: '1px solid black',paddingLeft: 10, paddingRight: 10, paddingTop: 6, paddingBottom: 6}}>
                                        {work.jobTypeDetail}({work.employmentType})
                                    </Text>
                                    <Text style={{color: '#343434', fontSize: 10, width: '20%',borderRight: '1px solid black',paddingLeft: 10, paddingRight: 10, paddingTop: 6, paddingBottom: 6}}>役職</Text>
                                    <Text style={{color: '#343434', fontSize: 10, width: '30%',paddingLeft: 10, paddingRight: 10, paddingTop: 6, paddingBottom: 6}}>{work.officialPosition}</Text>
                                </View>
                                <View style={{display: 'flex', flexDirection: 'row', width: '100%', borderTop: '1px solid black', minHeight: 40,wordBreak: 'break-word', textWrap: 'wrap', textOverflow: 'ellipsis'}}>
                                    <Text style={{color: '#343434', fontSize: 10, width: '20%',borderRight: '1px solid black',paddingLeft: 10, paddingRight: 10, paddingTop: 6, paddingBottom: 6}}>仕事内容</Text>
                                    <Text style={{color: '#343434', fontSize: 10, width: '80%',paddingLeft: 10, paddingRight: 10, paddingTop: 6, paddingBottom: 6, wordBreak: 'break-all'}}>{work.workContent}</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
                
                {/* Logo will appear on every page */}
                <Image src={"/assets/images/logo.png"} style={{width: 100, position: 'absolute', bottom: 20, right: 20}} fixed />
            </Page>
        </Document>
    )
}

export default PreviewCareer

