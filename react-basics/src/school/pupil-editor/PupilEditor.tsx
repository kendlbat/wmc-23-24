import React, { useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import PupilDetail from "./PupilDetail";
import PupilList from "./PupilList";

import PUPILS from "./data/Pupils.json";
import { Pupil } from "./types";

const PupilEditor: React.FC = () => {
    const [selectedPupil, setSelectedPupil] = useState<Pupil>(PUPILS[0]);

    return (
        <Container fluid className="p-3">
            <Row>
                <Col>
                    <PupilList
                        data={PUPILS}
                        selectedPupil={selectedPupil}
                        setSelectedPupil={setSelectedPupil}></PupilList>
                </Col>
                <Col>
                    <PupilDetail
                        pupil={selectedPupil}
                        setPupil={(pupil) => {
                            const idx: number = PUPILS.findIndex(
                                (p) => p.id == pupil.id
                            );
                            PUPILS[idx] = pupil;
                            setSelectedPupil(pupil);
                        }}></PupilDetail>
                </Col>
            </Row>
        </Container>
    );
};

export default PupilEditor;
