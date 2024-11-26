import { useEffect, useState } from "react";
import { getPopulations, getPrefectures } from "../../services/home";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { endYear, options, prefColorList, startYear } from "../../utils/common";
import { graphData, option, population, prefectures, prefecturesChkList } from "../../types/interface";
import "./home.css";

function Home() {
  const [prefectures, setPrefectures] = useState<prefectures[]>([]);
  const [prefecturesChkList, setPrefecturesChkList] = useState<prefecturesChkList>([]);
  const [populations, setPopulations] = useState<graphData[]>([]);
  const [graphfontSize, setgraphFontSize] = useState<number>(14);
  const [selectedOption, setSelectedOption] = useState<option | null>({ label: '総人口', value: 0 });

  const populationData: graphData[] = [];
  for (let i = startYear; i <= endYear; i = i + 5) {
    populationData.push({
      year: i,
    });
  }
  const handleSelectOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue: number = Number(event.target.value);
    const selected = options.find((option) => option.value === selectedValue);
    setSelectedOption(selected || null);
  };

  const createLine = () => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrefecturesChkList({
      ...prefecturesChkList,
      [e.target.id]: e.target.checked,
    });
    console.log("prefecturesChkList:", prefecturesChkList);
  };

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

  const renderSelecter = () => {
    return (
      <select
        className="home-select-value"
        value={selectedOption?.value}
        onChange={handleSelectOption}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    )
  };

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
            {createLine()}
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
              populationsList = await getPopulations(value1, Number(selectedOption?.value));
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
  }, [prefecturesChkList, selectedOption]);

  return (
    <>
      <div className="home">
        <header className="home-title">都道府県</header>
        <div className="home-prefecture-aria">{prefectures[0] && renderPrefectures()}</div>
        <div className="home-select-container">{renderSelecter()}</div>
        <div className='home-graph-aria'>{populations[0] && prefecturesChkList && renderGraph()}</div>
      </div>
    </>
  );
}

export default Home;
