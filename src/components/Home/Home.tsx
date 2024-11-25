import { useEffect, useState } from "react";
import { getPopulations, getPrefectures } from "../../services/home";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { prefColorList } from "../../utils/common";
import { graphData, population, prefectures, prefecturesChkList } from "../../types/interface";
import "./home.css";

function Home() {
  const [prefectures, setPrefectures] = useState<prefectures[]>([]);
  const [prefecturesChkList, setPrefecturesChkList] = useState<prefecturesChkList>([]);
  const [populations, setPopulations] = useState<graphData[]>([]);
  const [graphfontSize, setgraphFontSize] = useState<number>(14);

  // グラフに表示するデータの開始年と終了年を設定
  const startYear: number = 1960;
  const endYear: number = 2045;

  // グラフで表示するデータのひな型を設定
  const populationData: graphData[] = [];
  for (let i = startYear; i <= endYear; i = i + 5) {
    populationData.push({
      year: i,
    });
  }

  // グラフに表示する線
  const renderLine = () => {
    const renderLineList = [];
    for (let j = 1; j <= 47; j++) {
      renderLineList.push(
        <Line
          type="monotone"
          yAxisId={1}
          dataKey={j}
          name={prefectures[j - 1].prefName}
          stroke={prefColorList[j - 1]}
          dot={false}
        />,
      );
    }
    return renderLineList;
  };

  // チェック時の処理
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrefecturesChkList({
      ...prefecturesChkList,
      [e.target.id]: e.target.checked,
    });
    console.log("prefecturesChkList:", prefecturesChkList);
  };

  // 都道府県エリアを表示
  const renderPrefectures = () => {
    console.log('prefectures', prefectures)
    const prefecturesList = prefectures.map(
      (pref: prefectures) => {
        return (
          <label key={String(pref.prefCode)} className="checkbox_container">
            <input
              id={String(pref.prefCode)}
              className="checkbox"
              type="checkbox"
              onChange={handleChange}
              checked={prefecturesChkList[pref.prefCode]}
            />
            {pref.prefName}
          </label>
        );
      },
    );
    return prefecturesList;
  };


  // グラフを表示
  const renderGraph = () => {
    console.log("populations3", populations);
    return (
      <>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={populations}
            margin={{
              right: 50,
              left: 50,
            }}
          >
            <XAxis
              dataKey="year"
              tick={{ fontSize: graphfontSize, fill: 'green', fontWeight: 'bold' }}
              tickFormatter={(tick) => `${tick}年`}
              interval={1}
              domain={[startYear, endYear]}
            />
            <YAxis
              yAxisId={1}
              tick={{ fontSize: graphfontSize, fill: 'blue', fontWeight: 'bold' }}
              tickFormatter={(tick) => `${tick.toLocaleString()}人`}
            />
            {renderLine()}
            <Tooltip
              formatter={(value) => {
                return `${value.toLocaleString()}人`
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </>
    );
  };

  // グラフのフォントサイズを解像度に併せて変更
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 600) {
        setgraphFontSize(7);
      } else if (width >= 600 && width < 1024) {
        setgraphFontSize(12);
      } else {
        setgraphFontSize(14);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    (async () => {
      const res = await getPrefectures();
      setPrefectures(res);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (Object.keys(prefecturesChkList).length) {
        console.log("prefecturesChkList333", prefecturesChkList);
        let populationsList: population[] = [];
        await Promise.all(
          Object.keys(prefecturesChkList)
            .filter((key) => prefecturesChkList[Number(key)] === true)
            .map(async (value1: string) => {
              populationsList = await getPopulations(value1);
              console.log("populationsList123", populationsList);
              populationsList.map((value, index) => {
                const param: string = `${value1}`;
                populationData[index][param] = value.value;
              });
              return <></>;
            }),
        );
        console.log("populationsList3", populationData);
        setPopulations(populationData);
      }
    })();
  }, [prefecturesChkList]);

  return (
    <>
      <div className="home">
        <div className="home-prefecture-aria">{prefectures[0] && renderPrefectures()}</div>
        <div className='home-graph-aria'>{populations[0] && prefecturesChkList && renderGraph()}</div>
      </div>
    </>
  );
}

export default Home;
