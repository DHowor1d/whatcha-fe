import { BadgeButton } from "@shared/badge-button";
import { ConditionItem } from "./ConditionItem";
import { SearchHeader } from "./SearchHeader";
import styles from "./SearchPage.module.css";
import { TabItem } from "./TabItem";
import { RangeInput } from "@shared/range-input";
import { ColorButton } from "@shared/color-button";
import {
  UIEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { BottomButton } from "@shared/bottom-button";
import { useNavigate } from "react-router";

interface Color {
  colorId: number;
  color: string;
  label: string;
}

interface Option {
  optionId: number;
  optionName: string;
}

const colorStr: Color[] = [
  { colorId: 0, color: "#ffffff", label: "화이트" },
  { colorId: 1, color: "#f5f5dc", label: "베이지" },
  { colorId: 2, color: "#c0c0c0", label: "실버" },
  { colorId: 3, color: "#808080", label: "그레이" },
  { colorId: 4, color: "#000000", label: "블랙" },
  { colorId: 5, color: "#583927", label: "브라운" },
  { colorId: 6, color: "#ff0000", label: "레드" },
  { colorId: 7, color: "#ffa500", label: "오렌지" },
  { colorId: 8, color: "#ffff00", label: "옐로우" },
  { colorId: 9, color: "#0000ff", label: "블루" },
  { colorId: 10, color: "#00ff00", label: "그린" },
  { colorId: 11, color: "#800080", label: "퍼플" },
];

const carTypeStr = ["승용", "SUV", "승합", "EV"];
const modelStr = [
  "아반떼",
  "쏘나타",
  "그랜저",
  "베뉴",
  "싼타페",
  "코나",
  "투싼",
  "펠리세이드",
  "스타리아",
  "아이오닉",
  "캐스퍼",
  "벨로스터",
];
const fuelStr = ["가솔린", "디젤", "하이브리드", "전기"];
const optionStr: Option[] = [
  { optionId: 0, optionName: "내비게이션" },
  { optionId: 1, optionName: "하이패스" },
  { optionId: 2, optionName: "열선 스티어링 휠" },
  { optionId: 3, optionName: "열선시트(1열/2열)" },
  { optionId: 4, optionName: "통풍시트(1열)" },
  { optionId: 5, optionName: "전동시트(1열)" },
  { optionId: 6, optionName: "가죽 시트" },
  { optionId: 7, optionName: "전동식 트렁크" },
  { optionId: 8, optionName: "선루프" },
  { optionId: 9, optionName: "헤드업 디스플레이" },
  { optionId: 10, optionName: "서라운드 뷰 모니터" },
  { optionId: 11, optionName: "후방 모니터" },
  { optionId: 12, optionName: "후측방 경보 시스템" },
  { optionId: 13, optionName: "차선 이탈 경보" },
  { optionId: 14, optionName: "스마트 크루즈 컨트롤" },
  { optionId: 15, optionName: "전방 주차거리 경고" },
];

export function SearchPage() {
  const navigate = useNavigate();

  const [currentTab, setCurrentTab] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [carTypes, setCarTypes] = useState<string[]>([]);
  const [carTypeValues, setCarTypeValues] = useState<boolean[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [modelValues, setModelValues] = useState<boolean[]>([]);
  const [priceFrom, setPriceFrom] = useState("0");
  const [priceTo, setPriceTo] = useState("0");
  const [mileageFrom, setMileageFrom] = useState("0");
  const [mileageTo, setMileageTo] = useState("0");
  const [yearFrom, setYearFrom] = useState("0");
  const [yearTo, setYearTo] = useState("0");
  const [fuels, setFuels] = useState<string[]>([]);
  const [fuelValues, setFuelValues] = useState<boolean[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [colorValues, setColorValues] = useState<boolean[]>([]);
  const [options, setOptions] = useState<Option[]>([]);
  const [optionValues, setOptionValues] = useState<boolean[]>([]);

  const carTypeQuery = useMemo(() => {
    const filtered: string[] = carTypes.filter((_, i) => carTypeValues[i]);
    if (filtered.length === 0) return null;

    return `modelType=${filtered.join(",")}`;
  }, [carTypeValues, carTypes]);

  const modelQuery = useMemo(() => {
    const filtered: string[] = models.filter((_, i) => modelValues[i]);
    if (filtered.length === 0) return null;

    return `modelName=${filtered.join(",")}`;
  }, [modelValues, models]);

  const priceQuery = useMemo(() => {
    return priceFrom === "" || priceTo === ""
      ? null
      : `priceMin=${priceFrom}&priceMax=${priceTo}`;
  }, [priceTo, priceFrom]);

  const mileageQuery = useMemo(() => {
    return mileageFrom === "" || mileageTo === ""
      ? null
      : `mileageMin=${mileageFrom}&mileageMax=${mileageTo}`;
  }, [mileageFrom, mileageTo]);

  const yearQuery = useMemo(() => {
    return yearFrom === "" || yearTo === ""
      ? null
      : `yearMin=${yearFrom}&yearMax=${yearTo}`;
  }, [yearFrom, yearTo]);

  const fuelQuery = useMemo(() => {
    const filtered: string[] = fuels.filter((_, i) => fuelValues[i]);
    if (filtered.length === 0) return null;

    return `fuelType=${filtered.join(",")}`;
  }, [fuelValues, fuels]);

  const colorQuery = useMemo(() => {
    const filtered: string[] = colors
      .filter((_, i) => colorValues[i])
      .map((color) => color.label);
    if (filtered.length === 0) return null;

    return `colorName=${filtered.join(",")}`;
  }, [colorValues, colors]);

  const optionQuery = useMemo(() => {
    const filtered: number[] = options
      .filter((_, i) => optionValues[i])
      .map((option) => option.optionId);
    if (filtered.length === 0) return null;

    return `optionId=${filtered.join(",")}`.replaceAll(" ", "_");
  }, [optionValues, options]);

  const queries = useMemo(() => {
    return [
      carTypeQuery,
      modelQuery,
      priceQuery,
      mileageQuery,
      yearQuery,
      fuelQuery,
      colorQuery,
      optionQuery,
    ]
      .filter((query) => query !== null)
      .join("&");
  }, [
    carTypeQuery,
    modelQuery,
    priceQuery,
    mileageQuery,
    yearQuery,
    fuelQuery,
    colorQuery,
    optionQuery,
  ]);

  console.log(queries);

  const conditionBoxRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<(null | HTMLDivElement)[]>([]);

  useEffect(() => {
    setCarTypes(carTypeStr);
    setCarTypeValues(Array.from({ length: carTypeStr.length }, () => false));
    setModels(modelStr);
    setModelValues(Array.from({ length: modelStr.length }, () => false));
    setFuels(fuelStr);
    setFuelValues(Array.from({ length: fuelStr.length }, () => false));
    setColors(colorStr);
    setColorValues(Array.from({ length: colorStr.length }, () => false));
    setOptions(optionStr);
    setOptionValues(Array.from({ length: optionStr.length }, () => false));
  }, []);

  const handleChangeKeyword = useCallback((value: string) => {
    setKeyword(value);
  }, []);

  const handleScrollConditionBox: UIEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      const scrollTop = (e.target as HTMLDivElement).scrollTop + 40;

      for (let i = tabsRef.current.length - 1; i >= 0; i--) {
        const top = (tabsRef.current[i] as HTMLDivElement).offsetTop;

        if (scrollTop >= top) {
          setCurrentTab(i);
          return;
        }
      }
    },
    []
  );

  const handleClickTab = useCallback((tabIdx: number) => {
    conditionBoxRef.current!.scrollTo({
      top: tabsRef.current[tabIdx]!.offsetTop - 40,
      behavior: "smooth",
    });
  }, []);

  const handleClickCarTypeItem = useCallback((itemIdx: number) => {
    setCarTypeValues((prev) =>
      prev.map((value, i) => (i === itemIdx ? !value : value))
    );
  }, []);

  const handleClickModelItem = useCallback((itemIdx: number) => {
    setModelValues((prev) =>
      prev.map((value, i) => (i === itemIdx ? !value : value))
    );
  }, []);

  const handleChangePriceFrom = useCallback((value: string) => {
    setPriceFrom(value);
  }, []);

  const handleChangePriceTo = useCallback((value: string) => {
    setPriceTo(value);
  }, []);

  const handleChangeMileageFrom = useCallback((value: string) => {
    setMileageFrom(value);
  }, []);

  const handleChangeMileageTo = useCallback((value: string) => {
    setMileageTo(value);
  }, []);

  const handleChangeYearFrom = useCallback((value: string) => {
    setYearFrom(value);
  }, []);

  const handleChangeYearTo = useCallback((value: string) => {
    setYearTo(value);
  }, []);

  const handleClickFuelItem = useCallback((itemIdx: number) => {
    setFuelValues((prev) =>
      prev.map((value, i) => (i === itemIdx ? !value : value))
    );
  }, []);

  const handleClickColorItem = useCallback((itemIdx: number) => {
    setColorValues((prev) =>
      prev.map((value, i) => (i === itemIdx ? !value : value))
    );
  }, []);

  const handleClickOptionItem = useCallback((itemIdx: number) => {
    setOptionValues((prev) =>
      prev.map((value, i) => (i === itemIdx ? !value : value))
    );
  }, []);

  const handleClickSearch = useCallback(() => {
    if (keyword) navigate(`/list?type=search&keyword=${keyword}`);
  }, [navigate, keyword]);

  const handleClickFilteringSearch = useCallback(() => {
    navigate(`/list?type=search&${queries}`);
  }, [navigate, queries]);

  return (
    <div className={styles.container}>
      <SearchHeader
        onClickSearch={handleClickSearch}
        onChangeKeyword={handleChangeKeyword}
        keyword={keyword}
      />
      <div className={styles.content}>
        <div className={styles["tab-list"]}>
          {[
            "차종",
            "모델",
            "가격",
            "주행거리",
            "연식",
            "연료",
            "색상 계열",
            "옵션",
          ].map((tab, i) => (
            <TabItem
              key={i}
              selected={i === currentTab}
              onClick={() => handleClickTab(i)}
            >
              {tab}
            </TabItem>
          ))}
        </div>
        <div
          className={styles["condition-box"]}
          onScroll={handleScrollConditionBox}
          ref={conditionBoxRef}
        >
          <ConditionItem ref={(e) => (tabsRef.current[0] = e)} title="차종">
            <div className={styles.grid}>
              {carTypes.map((carType, i) => (
                <BadgeButton
                  key={i}
                  selected={carTypeValues[i]}
                  onClick={() => handleClickCarTypeItem(i)}
                >
                  {carType}
                </BadgeButton>
              ))}
            </div>
          </ConditionItem>
          <ConditionItem ref={(e) => (tabsRef.current[1] = e)} title="모델">
            <div className={styles.grid}>
              {models.map((model, i) => (
                <BadgeButton
                  key={i}
                  selected={modelValues[i]}
                  onClick={() => handleClickModelItem(i)}
                >
                  {model}
                </BadgeButton>
              ))}
            </div>
          </ConditionItem>
          <ConditionItem ref={(e) => (tabsRef.current[2] = e)} title="가격">
            <RangeInput
              from={{
                value: priceFrom,
                onChange: handleChangePriceFrom,
                unit: "만원",
                suffix: "부터",
              }}
              to={{
                value: priceTo,
                onChange: handleChangePriceTo,
                unit: "만원",
                suffix: "까지",
              }}
            />
          </ConditionItem>
          <ConditionItem ref={(e) => (tabsRef.current[3] = e)} title="주행거리">
            <RangeInput
              from={{
                value: mileageFrom,
                onChange: handleChangeMileageFrom,
                unit: "km",
                suffix: "부터",
              }}
              to={{
                value: mileageTo,
                onChange: handleChangeMileageTo,
                unit: "km",
                suffix: "까지",
              }}
            />
          </ConditionItem>
          <ConditionItem ref={(e) => (tabsRef.current[4] = e)} title="연식">
            <RangeInput
              from={{
                value: yearFrom,
                onChange: handleChangeYearFrom,
                unit: "년",
                suffix: "부터",
              }}
              to={{
                value: yearTo,
                onChange: handleChangeYearTo,
                unit: "년",
                suffix: "까지",
              }}
            />
          </ConditionItem>
          <ConditionItem ref={(e) => (tabsRef.current[5] = e)} title="연료">
            <div className={styles.grid}>
              {fuels.map((fuel, i) => (
                <BadgeButton
                  key={i}
                  selected={fuelValues[i]}
                  onClick={() => handleClickFuelItem(i)}
                >
                  {fuel}
                </BadgeButton>
              ))}
            </div>
          </ConditionItem>
          <ConditionItem
            ref={(e) => (tabsRef.current[6] = e)}
            title="색상 계열"
          >
            <div className={styles.grid}>
              {colors.map((color, i) => (
                <ColorButton
                  color={color.color}
                  label={color.label}
                  key={i}
                  selected={colorValues[i]}
                  onClick={() => handleClickColorItem(i)}
                />
              ))}
            </div>
          </ConditionItem>
          <ConditionItem
            ref={(e) => (tabsRef.current[7] = e)}
            title="옵션"
            last
          >
            <div className={styles.grid}>
              {options.map((option, i) => (
                <BadgeButton
                  key={i}
                  selected={optionValues[i]}
                  onClick={() => handleClickOptionItem(i)}
                >
                  {option.optionName}
                </BadgeButton>
              ))}
            </div>
          </ConditionItem>
        </div>
      </div>
      <BottomButton onClick={handleClickFilteringSearch}>
        조건 검색
      </BottomButton>
    </div>
  );
}
