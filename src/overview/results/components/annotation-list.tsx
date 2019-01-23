import React, { Component } from 'react'
import cx from 'classnames'

import AnnotationBox from 'src/sidebar-common/annotation-box'
import { Annotation } from 'src/sidebar-common/sidebar/types'
import { DUMMY_ANNOTATION } from '../constants'

const styles = require('./annotation-list.css')

export interface Props {
    annotations: Annotation[]
}

export interface State {
    /* Boolean to denote whether the list is expanded or not */
    isExpanded: boolean
}

class AnnotationList extends Component<Props, State> {
    static defaultProps = {
        annotations: [
            { ...DUMMY_ANNOTATION },
            { ...DUMMY_ANNOTATION },
            { ...DUMMY_ANNOTATION },
        ],
    }

    state = {
        isExpanded: false,
    }

    handleArrowClick = () => {
        this.setState(
            (prevState: State): State => ({
                ...prevState,
                isExpanded: !prevState.isExpanded,
            }),
        )
    }

    renderAnnotations = () => {
        return this.props.annotations.map(annot => (
            /* Wrapper element to restrict the width of the annotation box */
            <div className={styles.annotation}>
                <AnnotationBox
                    key={annot.url}
                    env="overview"
                    isActive={false}
                    isHovered={false}
                    url={annot.url}
                    body={annot.body}
                    comment={annot.body}
                    tags={annot.tags}
                    createdWhen={annot.createdWhen}
                    handleGoToAnnotation={() => null}
                    handleDeleteAnnotation={() => null}
                    handleEditAnnotation={() => null}
                    handleMouseEnter={() => null}
                    handleMouseLeave={() => null}
                />
            </div>
        ))
    }

    render() {
        const { isExpanded } = this.state
        return (
            <div className={styles.container}>
                {/* Chevron up/down toggle button */}
                <div className={styles.iconContainer}>
                    <span
                        className={cx(styles.icon, {
                            [styles.inverted]: isExpanded,
                        })}
                        onClick={this.handleArrowClick}
                    />
                </div>

                {/* Container for displaying AnnotationBox */}
                <div className={styles.annotationList}>
                    {isExpanded ? this.renderAnnotations() : null}
                </div>
            </div>
        )
    }
}

export default AnnotationList
