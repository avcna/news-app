import { useEffect, useState } from "react";
import { api } from "../api/baseUrl";
import Navbar from "../components/Navbar";
import NewsCard from "../components/NewsCard";
import styled from "styled-components";
import Footer from "../components/Footer";
import { date_converter } from "../helpers/date_converter";
import { NewsWrapper } from "../components/NewsComponents";
import { NewsCardSkeleton } from "../components/NewsCardSkeleton";
import { ErrorPage } from "./Error";
import Filter from "../components/Filter";

const apiKey = import.meta.env.VITE_API_KEY;

const Section = styled.section`
  padding: 16px 44px;
  position: relative;
`;

interface Article {
  author?: string;
  title?: string;
  urlToImage?: string;
  url?: string;
  publishedAt?: string;
}

const PageWrapper = styled.section`
  display: flex;
  column-gap: 16px;
  position: relative !important;
`;

const PageBtnWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  column-gap: 16px;
`;

const PageBtn = styled.button`
  border-radius: 8px;
  width: 100px;
  padding: 10px 0;
  border: 1px solid #ff5757;
  background-color: #fff;
  font-size: 16px;
  margin-top: 24px;
  cursor: pointer;
`;

interface FilterState {
  lang: string;
  sort: string;
}

const Main = () => {
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [q, setQ] = useState<string>("");
  const [page, setPage] = useState(1);
  const [inMain, setInMain] = useState(true);
  const [inSearched, setInSearched] = useState(false);
  const [inFilter, setInFilter] = useState(false);
  const [result, setResult] = useState(0);
  const [filter, setFilter] = useState<FilterState>({
    lang: "",
    sort: "",
  });

  const image = [
    "https://s.yimg.com/os/en-SG/blogs/singaporeshowbiz/Paparazzi-crowding-around-Britney-Spears.jpg",
    "https://asset.kompas.com/crops/YQrcfXdm304xoWSOn2yxjOxxFyQ=/0x168:5500x3834/750x500/data/photo/2022/01/11/61dd7a1b1e57e.jpg",
    "https://storage.nu.or.id/storage/post/16_9/mid/demo-peringatan-darurat-indonesia_1724325582.webp",
    "https://lamanjambi.com/wp-content/uploads/2022/03/70712_migor.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Jalan_MH_Thamrin_Menteng%2C_Jakarta_Pusat.jpg/640px-Jalan_MH_Thamrin_Menteng%2C_Jakarta_Pusat.jpg",
  ];

  const getRandomImage = (): string => {
    const randomIndex = Math.floor(Math.random() * image.length);
    return image[randomIndex];
  };

  const getTopNews = async (page: number) => {
    setInMain(true);
    setInSearched(false);
    setInFilter(false);
    setLoading(true);
    try {
      const res = await api.get(
        `top-headlines?country=us&page=${page}&apiKey=${apiKey}`
      );
      console.log(res.data.articles);
      setNews(res.data.articles);
      setResult(Math.ceil(res.data.totalResults / 20));
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error?.message);
        setIsError(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (keyword: string) => {
    setInSearched(true);
    setInMain(false);
    setInFilter(false);
    setLoading(true);
    setQ(keyword);
    setPage(1);
    try {
      const res = await api.get(
        `everything?q=${keyword}&pageSize=20&apiKey=${apiKey}`
      );
      setNews(res.data.articles);
      setResult(Math.ceil(res.data.totalResults / 20));
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error?.message);
        setIsError(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleApiPage = async (page: number) => {
    if (inMain) {
      await getTopNews(page);
    } else if (inSearched) {
      if (inFilter) {
        setLoading(true);
        const { lang, sort } = filter;
        try {
          const res = await api.get(
            `everything?q=${q}${lang.length !== 0 && "&language=" + lang}${
              sort.length !== 0 ? "&sortBy=" + sort : "&sortBy=publishedAt"
            }&pageSize=20&page=${page}&apiKey=${apiKey}`
          );
          setNews(res.data.articles);
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.log(error.message);
          }
          throw error;
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(true);
        try {
          const res = await api.get(
            `everything?q=${q}&pageSize=20&page=${page}&apiKey=${apiKey}`
          );
          setNews(res.data.articles);
          setResult(Math.ceil(res.data.totalResults / 20));
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.log(error?.message);
            setIsError(true);
          }
        } finally {
          setLoading(false);
        }
      }
    }
  };

  const handleNextPage = () => {
    const newPage = page + 1;
    setPage(newPage);
    handleApiPage(newPage);
  };

  const handlePreviousPage = () => {
    const newPage = page - 1;
    setPage(newPage);
    handleApiPage(newPage);
  };

  const handleFilter = async () => {
    setInFilter(true);
    setLoading(true);
    setPage(1);
    const { lang, sort } = filter;
    try {
      const res = await api.get(
        `everything?q=${q}${lang.length !== 0 && "&language=" + lang}${
          sort.length !== 0 ? "&sortBy=" + sort : "&sortBy=publishedAt"
        }&pageSize=20&page=${page}&apiKey=${apiKey}`
      );
      setNews(res.data.articles);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTopNews(1);
  }, []);

  return (
    <>
      <Navbar handleSearch={handleSearch} />
      <Section>
        <PageWrapper>
          <Filter
            setFilter={setFilter}
            q={q}
            filter={filter}
            handleFilter={handleFilter}
          />
          <section style={{ width: "100%" }}>
            {loading ? (
              <NewsCardSkeleton />
            ) : isError ? (
              <ErrorPage />
            ) : news.length === 0 ? (
              <ErrorPage />
            ) : (
              <NewsWrapper>
                {news.map((item, index) => {
                  const date = date_converter(item?.publishedAt || "");
                  return (
                    <NewsCard
                      key={index}
                      author={item?.author || "Penulis Tidak Diketahui"}
                      title={item?.title || "Tanpa Judul"}
                      urlToImg={
                        item.urlToImage ? item.urlToImage : getRandomImage()
                      }
                      url={item?.url || ""}
                      date={date}
                    />
                  );
                })}
              </NewsWrapper>
            )}
            <PageBtnWrapper>
              {page !== 1 && (
                <PageBtn onClick={handlePreviousPage}>Previous</PageBtn>
              )}
              {page < result && (
                <PageBtn onClick={handleNextPage}>Next</PageBtn>
              )}
            </PageBtnWrapper>
          </section>
        </PageWrapper>
      </Section>
      <Footer />
    </>
  );
};

export default Main;
