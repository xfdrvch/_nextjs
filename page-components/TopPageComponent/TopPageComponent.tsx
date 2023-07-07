import React, { useReducer } from "react";
import { TopPageComponentProps } from "./TopPageComponent.props";
import { Htag, Tag, HhData, Advantages, Sort } from "../../components";
import style from "./TopPageComponent.module.css";
import { TopLevelGategory } from "../../interfaces/page.interface";
import { SortEnum } from "../../components/Sort/Sort.props";
import { sortReducer } from "./sort.reducer";

function TopPageComponent({
  products,
  firstCategory,
  page,
}: TopPageComponentProps): JSX.Element {
  const [{ products: sortProducts, sort }, dispatchSort] = useReducer(sortReducer, {
    products,
    sort: SortEnum.Rating,
  });

  const setSort = (sort: SortEnum) => {
    dispatchSort({ type: sort });
  };

  return (
    <div className={style.wrapper}>
      <div className={style.title}>
        <Htag tag='h1'>{page.title}</Htag>
        <Tag color='grey' size='middle'>
          {products && products.length}
        </Tag>
        <Sort sort={sort} setSort={setSort} />
      </div>
      <div>
        {sortProducts &&
          sortProducts.map((p) => <div key={p._id}>{p.title}</div>)}
      </div>
      <div className={style.hhTitle}>
        <Htag tag='h2'>Вакансии - {page.category}</Htag>
        <Tag color='red' size='middle'>
          hh.ru
        </Tag>
      </div>
      {firstCategory === TopLevelGategory.Courses && page.hh && (
        <HhData {...page.hh} />
      )}
      {page.advantages && page.advantages.length > 0 && (
        <>
          <Htag tag='h2'>Приемущества</Htag>
          <Advantages advantages={page.advantages} />
        </>
      )}
      {page.seoText && (
        <div
          className={style.seo}
          dangerouslySetInnerHTML={{ __html: page.seoText }}
        />
      )}
      <Htag tag='h2'>Получаемые навыки</Htag>
      {page.tags.map((t) => (
        <Tag color='primary' key={t}>
          {t}
        </Tag>
      ))}
    </div>
  );
}

export default TopPageComponent;
