import styles from './index.module.scss';

import Head from 'next/head';
import { JSX, useMemo, useReducer } from 'react';

import { Bookshelf } from '../components/bookshelf/bookshelf';
import Slide from '../components/slide/slide';
import createLinkElement from '../config/create-link-element.function';
import {
  TitleField,
  TitleSource,
  TitleTag,
} from '../models/prospero-library-title-models';
import { ProsperoLibraryProps } from './base-prospero-props.model';

interface BaseFilter {
  label: string;
}

interface TagFilter extends BaseFilter {
  value: TitleTag;
}

interface FieldFilter extends BaseFilter {
  value: TitleField;
}

interface SourceFilter extends BaseFilter {
  value: TitleSource;
}

interface Filters {
  search?: string;
  tag?: TitleTag;
  field?: TitleField;
  source?: TitleSource;
}

export function ProsperoLibraryPage({
  config,
  books,
}: ProsperoLibraryProps): JSX.Element {
  const searchId = useMemo(() => 'prospero-title-search', []);

  const tagsFilterId = useMemo(() => 'prospero-title-tag-filter', []);

  const tagsFilters: Array<TagFilter> = useMemo(
    () => [
      {
        label: 'Essay',
        value: 'essay',
      },
      {
        label: 'Novel',
        value: 'novel',
      },
      {
        label: 'Novella',
        value: 'novella',
      },
      {
        label: 'Play',
        value: 'play',
      },
    ],
    []
  );

  const fieldFilterId = useMemo(() => 'prospero-title-field-filter', []);

  const fieldFilters: Array<FieldFilter> = useMemo(
    () => [
      {
        label: 'Computer Science',
        value: 'computer science',
      },
      {
        label: 'Fiction',
        value: 'fiction',
      },
      {
        label: 'Philosophy',
        value: 'philosophy',
      },
      {
        label: 'Satire',
        value: 'satire',
      },
    ],
    []
  );

  const sourceFilterId = useMemo(() => 'prospero-title-source-filter', []);

  const sourceFilters: Array<SourceFilter> = useMemo(
    () => [
      {
        label: 'Project Gutenberg',
        value: 'Project Gutenberg',
      },
    ],
    []
  );

  const [filters, dispatchFilterChange] = useReducer<
    Filters,
    [Partial<Filters>]
  >((state, change) => {
    return {
      ...state,
      ...change,
    };
  }, {});

  let filteredBooks = books;

  if (filters.search) {
    const searchExpression = new RegExp(filters.search, 'i');

    filteredBooks = filteredBooks.filter((book) => {
      const titleMatch = book.name.match(searchExpression),
        firstNameMatch = book.authorFirstName.match(searchExpression),
        lastNameMatch = book.authorLastName.match(searchExpression);

      return titleMatch || firstNameMatch || lastNameMatch;
    });
  }

  if (filters.tag) {
    filteredBooks = filteredBooks.filter((book) =>
      book.tags.includes(filters.tag!)
    );
  }

  if (filters.field) {
    filteredBooks = filteredBooks.filter((book) =>
      book.fields.includes(filters.field!)
    );
  }

  if (filters.source) {
    filteredBooks = filteredBooks.filter(
      (book) => book.source === filters.source
    );
  }

  return (
    <>
      <Head>
        <title>{config.seo.title}</title>
        <meta name="description" content={config.seo.description} />
        <meta property="og:title" content={config.seo.title} />
        <meta property="og:description" content={config.seo.description} />
      </Head>
      <Slide className={styles.prosperoPage}>
        <>
          <h1 className={styles.prosperoHeader}>{config.textContent.header}</h1>

          <Bookshelf className={styles.bookshelf} books={filteredBooks} />

          <div className={styles.filters}>
            <label htmlFor={searchId}>Search</label>
            <input
              id={searchId}
              onChange={(event) => {
                dispatchFilterChange({
                  search: event.currentTarget.value || undefined,
                });
              }}
            />

            <label htmlFor={tagsFilterId}>Tags</label>
            <select
              id={tagsFilterId}
              onChange={(event) => {
                dispatchFilterChange({
                  tag: event.currentTarget.value as TitleTag,
                });
              }}
            >
              <option></option>
              {tagsFilters.map(({ label, value }) => {
                return (
                  <option key={value} value={value}>
                    {label}
                  </option>
                );
              })}
            </select>

            <label htmlFor={fieldFilterId}>Fields</label>
            <select
              id={fieldFilterId}
              onChange={(event) => {
                dispatchFilterChange({
                  field: event.currentTarget.value as TitleField,
                });
              }}
            >
              <option></option>
              {fieldFilters.map(({ label, value }) => {
                return (
                  <option key={value} value={value}>
                    {label}
                  </option>
                );
              })}
            </select>

            <label htmlFor={sourceFilterId}>Source</label>
            <select
              id={sourceFilterId}
              onChange={(event) => {
                dispatchFilterChange({
                  source: event.currentTarget.value as TitleSource,
                });
              }}
            >
              <option></option>
              {sourceFilters.map(({ label, value }) => {
                return (
                  <option key={value} value={value}>
                    {label}
                  </option>
                );
              })}
            </select>
          </div>

          <div className={styles.description}>
            {config.textContent.description.map((line, i) => {
              if (typeof line === 'object') {
                return (
                  <p
                    key={i}
                    dangerouslySetInnerHTML={{
                      __html: createLinkElement(line),
                    }}
                  />
                );
              } else {
                return <p key={i}>{line}</p>;
              }
            })}
          </div>
        </>
      </Slide>
    </>
  );
}
