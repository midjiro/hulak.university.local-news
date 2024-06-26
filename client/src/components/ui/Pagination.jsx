import React from 'react';

export const Pagination = ({
    onChange,
    onNext,
    onPrev,
    pages,
    currentPage,
}) => {
    const pageIndexes = Array.from({ length: pages }, (_, index) => index + 1);

    return (
        <section className='pagination publications-preview__pagination'>
            <button
                className='btn'
                onClick={onPrev}
                disabled={currentPage === 1}
            >
                Prev
            </button>
            <div className='pagination__pages'>
                {pageIndexes.map((index) => (
                    <button
                        className={
                            index === currentPage
                                ? 'btn pagination__btn--active'
                                : 'btn pagination__btn'
                        }
                        onClick={() => onChange(index)}
                        key={index}
                    >
                        {index}
                    </button>
                ))}
            </div>
            <button
                className='btn'
                onClick={onNext}
                disabled={currentPage === pages}
            >
                Next
            </button>
        </section>
    );
};
