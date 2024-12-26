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
    width: '100%'
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
});

// Resume component
const PreviewRireki = ({ rireki, datas }) => {
  const firstPage = datas.slice(0, 13)
  const secondPage = datas.slice(13, datas.length)
  const blankFirstPage = [];
  for(let i = 0; i < 13-firstPage.length; i++){
    blankFirstPage.push({year: "", month: "", contents: ""})
  }
  const blankSecondPage = [];
  for(let i = 0; i < 15-secondPage.length; i++){
    blankSecondPage.push({year: "", month: "", contents: ""})
  }
  
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Title */}
        <Text style={[styles.title, {color: '#343434'}]}>履歴書</Text>
        <View style={{display: 'flex', flexDirection: 'row', gap: 50, width: '100%'}}>
          <View style={[{display: 'flex', flexDirection: 'column'}, styles.section_1]}>
            {/* Date */}
            <Text style={[{ textAlign: 'right', letterSpacing: 1, color: '#343434'}, styles.date]}>{rireki?.creationDate}現在</Text>
            {/* Name */}
            <View style={{display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'flex-start', padding: 8, border: '1px solid black', borderBottom: '1px dotted black'}}>
              <Text style={[styles.text, {fontWeight: 'bold', width: '15%', color: '#343434'}]}>ふりがな</Text>
              <Text style={[styles.text, {color: '#343434'}]}>{rireki?.basic?.hiraganaName?.split(" ")[0]}</Text>
              <Text style={[styles.text, {color: '#343434'}]}>{rireki?.basic?.hiraganaName?.split(" ")[1]}</Text>
            </View>
            <View style={{display: 'flex', flexDirection: 'row', gap: 10, justifyContent: 'flex-start', alignItems: 'center', padding: 8, borderLeft: '1px solid black', borderRight: '1px solid black', borderBottom: '1px solid black'}}>
              <View style={{width: '15%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', gap: 10}}>
                <Text style={[styles.text, {fontWeight: 'bold', color: '#343434'}]}>氏</Text>
                <Text style={[styles.text, {fontWeight: 'bold', color: '#343434'}]}>名</Text>
              </View>
              <Text style={{fontSize: 20, color: '#343434'}}>{rireki?.basic?.name.split(" ")[0]}</Text>
              <Text style={{fontSize: 20, color: '#343434'}}>{rireki?.basic?.name.split(" ")[1]}</Text>
            </View>
            <View style={{display: 'flex', flexDirection: 'row', gap: 10, justifyContent: 'flex-start', alignItems: 'center', borderLeft: '1px solid black', borderRight: '1px solid black'}}>
              <View style={{width: '65%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', gap: 10, borderRight: '1px solid black'}}>
                <View style={{padding:8}}>
                  <Text style={[styles.text, {paddingRight: 10, letterSpacing: 1, color: '#343434'}]}>{rireki?.basic?.birthday.split("-")[0]}年{rireki?.basic?.birthday.split("-")[1]}月{rireki?.basic?.birthday.split("-")[2]}日(満{new Date().getFullYear() - new Date(rireki?.basic?.birthday).getFullYear()}歳)</Text>
                </View>
              </View>
              <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '35%'}}>
                {rireki?.basic?.gender === '男性' ? 
                    (
                      <>
                        <View style={{ border: '1px solid black', borderRadius: 10 , width: 20, aspectRatio: 1/1, textAlign: 'center'}}>
                          <Text style={[styles.text, {color: '#343434'}]}>
                            男
                          </Text>
                        </View>
                        <Text style={[styles.text, {color: '#343434'}]}>・</Text>
                        <Text style={[styles.text, {color: '#343434'}]}>女</Text>
                      </>
                    )
                    :
                    (
                      <>
                        <Text style={[styles.text, {color: '#343434'}]}>男</Text>
                        <Text style={[styles.text, {color: '#343434'}]}>・</Text>
                        <View style={{ border: '1px solid black', borderRadius: 10 , width: 20, aspectRatio: 1/1, textAlign: 'center'}}>
                          <Text style={[styles.text, {color: '#343434'}]}>
                            女
                          </Text>
                        </View>
                      </>
                    )
                }
              </View>
            </View>
          </View>
          <View style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start'}}>
            <Image src={rireki.basic.photo} style={styles.image} />
          </View>
        </View>
        <View style={{display: 'flex', flexDirection: 'column', width: '100%', border: '1px solid black'}}>
          <View style={{width: '100%', display: 'flex', flexDirection: 'row'}}>
            <View style={{width: '65%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start',alignItems: 'center', padding: 8, gap: 10, borderBottom: '1px dotted black', borderRight: '1px solid black'}}>
            </View>
            <View style={{width: '35%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start',alignItems: 'center', padding: 8, gap: 10, borderBottom: '1px dotted black'}}>
              <Text style={[styles.text, {color: '#343434'}]}>電話</Text>
              <Text style={{fontSize: 10, color: '#343434'}}>{rireki?.basic?.phoneNumber}</Text>
            </View>
          </View>
          <View style={{width: '100%', display: 'flex', flexDirection: 'row'}}>
            <View style={{width: '65%', display: 'flex', flexDirection: 'column', justifyContent: 'center',alignItems: 'flex-start', padding: 8, gap: 2, borderRight: '1px solid black'}}>
              <Text style={[styles.text, {color: '#343434'}]}>都道府県</Text>
              <Text style={{fontSize: 10, color: '#343434'}}>{rireki?.basic?.prefecture}</Text>
            </View>
            <View style={{width: '35%', display: 'flex', flexDirection: 'column', justifyContent: 'center',alignItems: 'flex-start', padding: 8, gap: 2}}>
              <Text style={[styles.text, {color: '#343434'}]}>E-mail</Text>
              <Text style={{fontSize: 10, color: '#343434'}}>{rireki?.basic?.email}</Text>
            </View>
          </View>
        </View>
        <View style={{display: 'flex', flexDirection: 'column', width: '100%', borderLeft: '1px solid black', borderRight: '1px solid black', borderBottom: '1px solid black'}}>
          <View style={{width: '100%', display: 'flex', flexDirection: 'row'}}>
            <View style={{width: '65%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start',alignItems: 'center', padding: 8, gap: 10, borderBottom: '1px dotted black', borderRight: '1px solid black'}}>
              
            </View>
            <View style={{width: '35%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', padding: 8, gap: 10, borderBottom: '1px dotted black'}}>
              <Text style={[styles.text, {color: '#343434'}]}>電話</Text>
              <Text style={{fontSize: 10, color: '#343434'}}>{rireki?.basic?.otherPhone}</Text>
            </View>
          </View>
          <View style={{width: '100%', display: 'flex', flexDirection: 'row'}}>
            <View style={{width: '65%', display: 'flex', flexDirection: 'column', justifyContent: 'center',alignItems: 'flex-start', padding: 8, gap: 2, borderRight: '1px solid black'}}>
              <Text style={[styles.text, {color: '#343434'}]}>都道府県</Text>
              <Text style={{fontSize: 10, color: '#343434'}}>{rireki?.basic?.otherPrefecture}</Text>
            </View>
            <View style={{width: '35%', display: 'flex', flexDirection: 'column', justifyContent: 'center',alignItems: 'flex-start', padding: 8, gap: 2}}>
              <Text style={[styles.text, {color: '#343434'}]}>E-mail</Text>
              <Text style={{fontSize: 10, color: '#343434'}}>{rireki?.basic?.otherEmail}</Text>
            </View>
          </View>
        </View>
        <View style={{display: 'flex', width: '100%', border: '1px solid black', marginTop: 8}}>
          <View style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
            <Text style={{fontSize: 10, width: '10%', textAlign: 'center', borderRight: '1px dotted black', padding: 6, color: '#343434'}}>年</Text>
            <Text style={{fontSize: 10, width: '10%', textAlign: 'center', borderRight: '1px solid black', padding: 6, color: '#343434'}}>月</Text>
            <Text style={{fontSize: 10, width: '80%', textAlign: 'center', padding: 6, color: '#343434'}}>学歴・職歴・免許・資格</Text>
          </View>
        {firstPage?.map((data, index) => {
          return (
            <>
              {data?.title &&
                  <View key={index} style={{display: 'flex', width: '100%'}}>
                      <View style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
                        <Text style={{fontSize: 10, width: '10%', textAlign: 'center', borderRight: '1px dotted black', borderTop: '1px dotted black', padding: 6, color: '#343434'}}>{data?.year}</Text>
                        <Text style={{fontSize: 10, width: '10%', textAlign: 'center', borderRight: '1px solid black', borderTop: '1px dotted black', padding: 6, color: '#343434'}}>{data?.month}</Text>
                        <Text style={{fontSize: 10, width: '80%', textAlign: 'center', padding: 6, borderTop: '1px dotted black', color: '#343434', letterSpacing: 0.5}}>{data?.contents}</Text>
                      </View>
                  </View>
              }
              { !data?.title && !data?.end && (data?.year !== '' || data?.month !== '' || data?.contents !== '') &&
                <View key={index} style={{display: 'flex', width: '100%'}}>
                  <View style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
                    <Text style={{fontSize: 10, width: '10%', textAlign: 'center', borderRight: '1px dotted black', borderTop: '1px dotted black', padding: 6, color: '#343434'}}>{data?.year}</Text>
                    <Text style={{fontSize: 10, width: '10%', textAlign: 'center', borderRight: '1px solid black', borderTop: '1px dotted black', padding: 6, color: '#343434'}}>{data?.month}</Text>
                    <Text style={{fontSize: 10, width: '80%', textAlign: 'left', padding: 6, borderTop: '1px dotted black', color: '#343434', letterSpacing: 0.5}}>{data?.contents}</Text>
                  </View>
                </View>
              }
              { (data?.year === '' && data?.month === '' && data?.contents === '') &&
                <View key={index} style={{display: 'flex', width: '100%'}}>
                  <View style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
                    <View style={{fontSize: 10, width: '10%', textAlign: 'center', borderRight: '1px dotted black', borderTop: '1px dotted black', padding: 12, color: '#343434'}}></View>
                    <View style={{fontSize: 10, width: '10%', textAlign: 'center', borderRight: '1px solid black', borderTop: '1px dotted black', padding: 12, color: '#343434'}}></View>
                    <View style={{fontSize: 10, width: '80%', textAlign: 'left', padding: 12, borderTop: '1px dotted black', color: '#343434', letterSpacing: 0.5}}></View>
                  </View>
                </View>
              }
              {data?.end &&
                  <View key={index} style={{display: 'flex', width: '100%'}}>
                      <View style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
                        <Text style={{fontSize: 10, width: '10%', textAlign: 'center', borderRight: '1px dotted black', borderTop: '1px dotted black', padding: 6, color: '#343434'}}>{data?.year}</Text>
                        <Text style={{fontSize: 10, width: '10%', textAlign: 'center', borderRight: '1px solid black', borderTop: '1px dotted black', padding: 6, color: '#343434'}}>{data?.month}</Text>
                        <Text style={{fontSize: 10, width: '80%', textAlign: 'right', padding: 6, borderTop: '1px dotted black', color: '#343434', letterSpacing: 0.5}}>{data?.contents}</Text>
                      </View>
                  </View>
              }
            </>
          )
        })}
        {blankFirstPage?.map((data, index) => {
          return (
            <View key={index} style={{display: 'flex', width: '100%'}}>
              <View style={{display: 'flex', flexDirection: 'row', width: '100%',}}>
                <Text style={{fontSize: 10, width: '10%', textAlign: 'center', borderRight: '1px dotted black', borderTop: '1px dotted black', padding: 12, color: '#343434'}}></Text>
                <Text style={{fontSize: 10, width: '10%', textAlign: 'center', borderRight: '1px solid black', borderTop: '1px dotted black', padding: 12, color: '#343434'}}></Text>
                <Text style={{fontSize: 10, width: '80%', textAlign: 'left', padding: 12, borderTop: '1px dotted black', color: '#343434', letterSpacing: 0.5}}></Text>
              </View>
            </View>
          )
        })}
        </View>
      </Page>
      <Page size="A4" style={styles.page}>
        <View style={{display: 'flex', width: '100%', border: '1px solid black', marginTop: 8}}>
          <View style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
            <Text style={{fontSize: 10, width: '10%', textAlign: 'center', borderRight: '1px dotted black', padding: 6, color: '#343434'}}>年</Text>
            <Text style={{fontSize: 10, width: '10%', textAlign: 'center', borderRight: '1px solid black', padding: 6, color: '#343434'}}>月</Text>
            <Text style={{fontSize: 10, width: '80%', textAlign: 'center', padding: 6, color: '#343434'}}>学歴・職歴・免許・資格</Text>
          </View>
          {secondPage?.map((data, index) => {
          return (
            (data?.title ?
              (
                <View key={index} style={{display: 'flex', width: '100%'}}>
                    <View style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
                      <Text style={{fontSize: 10, width: '10%', textAlign: 'center', borderRight: '1px dotted black', borderTop: '1px dotted black', padding: 6, color: '#343434'}}>{data?.year}</Text>
                      <Text style={{fontSize: 10, width: '10%', textAlign: 'center', borderRight: '1px solid black', borderTop: '1px dotted black', padding: 6, color: '#343434'}}>{data?.month}</Text>
                      <Text style={{fontSize: 10, width: '80%', textAlign: 'center', padding: 6, borderTop: '1px dotted black', color: '#343434', letterSpacing: 0.5}}>{data?.contents}</Text>
                    </View>
                </View>
            )
            :
            (
              <View key={index} style={{display: 'flex', width: '100%'}}>
                <View style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
                  <Text style={{fontSize: 10, width: '10%', textAlign: 'center', borderRight: '1px dotted black', borderTop: '1px dotted black', padding: 6, color: '#343434'}}>{data?.year}</Text>
                  <Text style={{fontSize: 10, width: '10%', textAlign: 'center', borderRight: '1px solid black', borderTop: '1px dotted black', padding: 6, color: '#343434'}}>{data?.month}</Text>
                  <Text style={{fontSize: 10, width: '80%', textAlign: 'left', padding: 6, borderTop: '1px dotted black', color: '#343434', letterSpacing: 0.5}}>{data?.contents}</Text>
                </View>
              </View>
            )),
            (data?.end ?
              (
                <View key={index} style={{display: 'flex', width: '100%'}}>
                    <View style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
                      <Text style={{fontSize: 10, width: '10%', textAlign: 'center', borderRight: '1px dotted black', borderTop: '1px dotted black', padding: 6, color: '#343434'}}>{data?.year}</Text>
                      <Text style={{fontSize: 10, width: '10%', textAlign: 'center', borderRight: '1px solid black', borderTop: '1px dotted black', padding: 6, color: '#343434'}}>{data?.month}</Text>
                      <Text style={{fontSize: 10, width: '80%', textAlign: 'right', padding: 6, borderTop: '1px dotted black', color: '#343434', letterSpacing: 0.5}}>{data?.contents}</Text>
                    </View>
                </View>
            )
            :
            (
              <View key={index} style={{display: 'flex', width: '100%'}}>
                <View style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
                  <Text style={{fontSize: 10, width: '10%', textAlign: 'center', borderRight: '1px dotted black', borderTop: '1px dotted black', padding: 6, color: '#343434'}}>{data?.year}</Text>
                  <Text style={{fontSize: 10, width: '10%', textAlign: 'center', borderRight: '1px solid black', borderTop: '1px dotted black', padding: 6, color: '#343434'}}>{data?.month}</Text>
                  <Text style={{fontSize: 10, width: '80%', textAlign: 'left', padding: 6, borderTop: '1px dotted black', color: '#343434', letterSpacing: 0.5}}>{data?.contents}</Text>
                </View>
              </View>
            ))
          )
        })}
        {blankSecondPage?.map((data, index) => {
          return (
            <View key={index} style={{display: 'flex', width: '100%'}}>
              <View style={{display: 'flex', flexDirection: 'row', width: '100%',}}>
                <Text style={{fontSize: 10, width: '10%', textAlign: 'center', borderRight: '1px dotted black', borderTop: '1px dotted black', padding: 12, color: '#343434'}}></Text>
                <Text style={{fontSize: 10, width: '10%', textAlign: 'center', borderRight: '1px solid black', borderTop: '1px dotted black', padding: 12, color: '#343434'}}></Text>
                <Text style={{fontSize: 10, width: '80%', textAlign: 'left', padding: 12, borderTop: '1px dotted black', color: '#343434', letterSpacing: 0.5}}></Text>
              </View>
            </View>
          )
        })}
        </View>
        <View style={{display: 'flex', flexDirection: 'row', width: '100%', border: '1px solid black', marginTop: 8}}>
          <View style={{width: '65%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start',alignItems: 'flex-start', padding: 8, gap: 6, borderRight: '1px solid black'}}>
            <Text style={{fontSize: 10, color: '#343434'}}>志望動機</Text>
            <Text style={{fontSize: 10, color: '#343434'}}>{rireki?.desire?.applyReason}</Text>
          </View>
          <View style={{width: '35%', display: 'flex', flexDirection: 'column', justifyContent: 'center',alignItems: 'flex-start', gap: 2}}>
            <View style={{display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'flex-start', alignItems: 'center', borderBottom: '1px solid black'}}>
              <Text style={{fontSize: 10, color: '#343434', textAlign: 'left', width: '100%', padding: 6}}>通勤時間</Text>
              <Text style={{fontSize: 10, color: '#343434', textAlign: 'center', width: '100%', padding: 6}}>{rireki?.other?.time}</Text>
            </View>
            <View style={{display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'flex-start', alignItems: 'center', borderBottom: '1px solid black'}}>
              <Text style={{fontSize: 10, color: '#343434', textAlign: 'left', width: '100%', padding: 6}}>扶養家族数（配偶者を除く）</Text>
              <Text style={{fontSize: 10, color: '#343434', textAlign: 'center', width: '100%', padding: 6}}>{rireki?.other?.dependents}人</Text>
            </View>
            <View style={{display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'flex-start', alignItems: 'center', paddingBottom: 6}}>
              <Text style={{fontSize: 10, color: '#343434', textAlign: 'left', width: '100%', padding: 6}}>配偶者</Text>
              {rireki?.other?.spouse === '有り' ? 
                    (
                      <>
                      <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{ border: '1px solid black', borderRadius: 10 , width: 20, aspectRatio: 1/1, textAlign: 'center'}}>
                          <Text style={[styles.text, {color: '#343434'}]}>
                            有
                          </Text>
                        </View>
                        <Text style={[styles.text, {color: '#343434'}]}>・</Text>
                        <Text style={[styles.text, {color: '#343434'}]}>無</Text>
                      </View>
                      </>
                    )
                    :
                    (
                      <>
                        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                          <Text style={[styles.text, {color: '#343434'}]}>有</Text>
                          <Text style={[styles.text, {color: '#343434'}]}>・</Text>
                          <View style={{ border: '1px solid black', borderRadius: 10 , width: 20, aspectRatio: 1/1, textAlign: 'center'}}>
                            <Text style={[styles.text, {color: '#343434'}]}>
                              無
                            </Text>
                          </View>
                        </View>
                      </>
                    )
                }
            </View>
          </View>
        </View>
        <View style={{display: 'flex', flexDirection: 'column', width: '100%', border: '1px solid black', marginTop: 8}}>
          <View style={{display: 'flex', width: '100%', padding: 8, textAlign: 'center', borderBottom: '1px solid black'}}>
            <Text style={{fontSize: 10, color: '#343434'}}>本人希望記入欄（特に待遇・職種・勤務時間・その他についての希望などがあれば記入）</Text>
          </View>
          <View style={{display: 'flex', width: '100%', height: 100, padding: 10, justifyContent: 'flex-start', alignItems: 'flex-start'}}>
            <Text style={{fontSize: 10, color: '#343434'}}>{rireki?.desire?.hope}</Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}

export default PreviewRireki;

