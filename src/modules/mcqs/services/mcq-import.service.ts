import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import * as XLSX from 'xlsx';

import { DifficultyLevel, MCQType } from '@prisma/client';

import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class McqImportService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  /**
   * Import MCQs from Excel
   */
  async import(
    params: {
      subjectId: string;
      chapterId: string;
      topicId: string;
    },
    file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException(
        'File is required',
      );
    }

    await this.validateHierarchy(
      params.subjectId,
      params.chapterId,
      params.topicId,
    );

    const workbook = XLSX.read(
      file.buffer,
      {
        type: 'buffer',
      },
    );

    const sheetName =
      workbook.SheetNames[0];

    const worksheet =
      workbook.Sheets[sheetName];

    const rows: any[] =
      XLSX.utils.sheet_to_json(
        worksheet,
      );

    if (!rows.length) {
      throw new BadRequestException(
        'Excel file is empty',
      );
    }

    const mcqs: any[] = [];
    const errors: any[] = [];

    for (
      let index = 0;
      index < rows.length;
      index++
    ) {
      const row = rows[index];

      try {
        const options =
          this.buildOptions(row);

        const mcq = {
          subjectId:
            params.subjectId,

          chapterId:
            params.chapterId,

          topicId:
            params.topicId,

          type:
            row.type ||
            MCQType.STANDARD,

          scenario:
            row.scenario_text ||
            row.scenario_image
              ? {
                  text:
                    row.scenario_text ??
                    null,

                  image:
                    row.scenario_image ??
                    null,
                }
              : null,

          question: {
            text:
              row.question_text ??
              null,

            image:
              row.question_image ??
              null,
          },

          options,

          correctOptionKey:
            row.correct_option,

          explanation:
            row.explanation_text ||
            row.explanation_image
              ? {
                  text:
                    row.explanation_text ??
                    null,

                  image:
                    row.explanation_image ??
                    null,
                }
              : null,

          references:
            this.parseReferences(
              row.references,
            ),

          optionCount:
            options.length,

          difficulty:
            row.difficulty ||
            DifficultyLevel.MEDIUM,

          isPremium:
            String(
              row.is_premium,
            ).toLowerCase() ===
            'true',
        };

        this.validateMcq(mcq);

        mcqs.push(mcq);
      } catch (error) {
        errors.push({
          row: index + 2,
          message:
            error instanceof Error
              ? error.message
              : 'Invalid row',
        });
      }
    }

    if (errors.length) {
      return {
        success: false,

        totalRows: rows.length,

        validRows:
          mcqs.length,

        invalidRows:
          errors.length,

        errors,
      };
    }

    await this.prisma.mCQ.createMany({
      data: mcqs,
    });

    return {
      success: true,

      totalRows: rows.length,

      imported:
        mcqs.length,
    };
  }

  /**
   * Validate Subject > Chapter > Topic
   */
  private async validateHierarchy(
    subjectId: string,
    chapterId: string,
    topicId: string,
  ) {
    const topic =
      await this.prisma.topic.findUnique({
        where: {
          id: topicId,
        },

        include: {
          chapter: true,
        },
      });

    if (!topic) {
      throw new BadRequestException(
        'Topic not found',
      );
    }

    if (
      topic.chapterId !==
      chapterId
    ) {
      throw new BadRequestException(
        'Topic does not belong to chapter',
      );
    }

    if (
      topic.chapter.subjectId !==
      subjectId
    ) {
      throw new BadRequestException(
        'Chapter does not belong to subject',
      );
    }
  }

  /**
   * Build options from Excel row
   */
  private buildOptions(
    row: any,
  ) {
    const options: {
  key: string;
  text: string | null;
  image: string | null;
}[] = [];

    if (
      row.option_a_text ||
      row.option_a_image
    ) {
      options.push({
        key: 'A',
        text:
          row.option_a_text ??
          null,
        image:
          row.option_a_image ??
          null,
      });
    }

    if (
      row.option_b_text ||
      row.option_b_image
    ) {
      options.push({
        key: 'B',
        text:
          row.option_b_text ??
          null,
        image:
          row.option_b_image ??
          null,
      });
    }

    if (
      row.option_c_text ||
      row.option_c_image
    ) {
      options.push({
        key: 'C',
        text:
          row.option_c_text ??
          null,
        image:
          row.option_c_image ??
          null,
      });
    }

    if (
      row.option_d_text ||
      row.option_d_image
    ) {
      options.push({
        key: 'D',
        text:
          row.option_d_text ??
          null,
        image:
          row.option_d_image ??
          null,
      });
    }

    if (
      row.option_e_text ||
      row.option_e_image
    ) {
      options.push({
        key: 'E',
        text:
          row.option_e_text ??
          null,
        image:
          row.option_e_image ??
          null,
      });
    }

    return options;
  }

  /**
   * Parse references
   */
  private parseReferences(
    value?: string,
  ) {
    if (!value) {
      return [];
    }

    return value
      .split('|')
      .map(item => ({
        value:
          item.trim(),
      }));
  }

  /**
   * Validate MCQ
   */
  private validateMcq(
    mcq: any,
  ) {
    if (
      !mcq.question?.text &&
      !mcq.question?.image
    ) {
      throw new Error(
        'Question is required',
      );
    }

    if (
      mcq.options.length < 2
    ) {
      throw new Error(
        'Minimum 2 options required',
      );
    }

    const correctOption =
      mcq.options.find(
        option =>
          option.key ===
          mcq.correctOptionKey,
      );

    if (!correctOption) {
      throw new Error(
        'Invalid correct option',
      );
    }
  }
}